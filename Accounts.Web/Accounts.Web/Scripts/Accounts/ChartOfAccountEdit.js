
$(function () {

    getCookie('ChartId');

    var chartId = parseInt(getCookie('ChartId'));

    if (chartId != null) {

        //LoadDropDown();

        $.ajax({
            url: getChartOfAccount,
            type: 'GET',
            success: function (data) {
                var result = JSON.parse(data);
                var list = _.find(result, function (o) { return o.id == chartId; })
                BindEditView(list);
            },
            error: function (xhr) {
                toastr.options.timeOut = 1500;
                toastr.warning(xhr.status + ': ' + xhr.statusText);
            }
        });
    }

    $('#btnUpdate').click(function () {
        if (Validate()) {
            var data1 = new Object();

            data1.Id = $('#txtChartId').val();
            data1.Name = $('#txtChartName').val();
            data1.GroupId = $('#ddlAccountGroup').val();
            data1.TypeId = $('#ddlAccountType').val();

            $.blockUI({ message: '<h1><img src="../Resources/Images/busy.gif" /> Wait a moment...</h1>' });
            $.ajax({

                url: insertChartOfAccountInfo,
                type: 'POST',
                data: data1,
                success: function (data) {
                    var result = JSON.parse(data);
                    $(document).ajaxStop($.unblockUI);

                    if (result.statusCode == "401") {
                        //logOut();
                    }
                    else if (result.statusCode == "200") {
                        $('#txtChartId').val(result.id);
                        ClearAlfterSave();
                        toastr.options.timeOut = 3500;
                        toastr.success(result.statusMessage);
                        $("#btnSave").attr("disabled", true);
                    }
                    else {
                        $(document).ajaxStop($.unblockUI);
                        toastr.options.timeOut = 3500;
                        toastr.warning(result.statusCode + ': ' + result.statusMessage);
                    }

                },
                error: function (xhr) {
                    $(document).ajaxStop($.unblockUI);
                    toastr.options.timeOut = 3500;
                    toastr.warning(xhr.status + ': ' + xhr.statusText);
                }
            });
        }
        else {

        }
    });

    $('#btnClear').click(function () {
        ClearAll();
    });
});

function BindEditView(list)
{
    BindGroup(list.groupId);
    BindType(list.typeId);
    $('#txtChartId').val(list.id);
    $('#txtChartName').val(list.name);
}

function BindGroup(groupId) {
    $.ajax({
        url: '/ChartOfAccount/GetGroupList',
        type: 'GET',
        success: function (data) {
            var result = JSON.parse(data);
            GroupDDLBind(result, groupId);
        },
        error: function (xhr) {
            toastr.options.timeOut = 1500;
            toastr.warning(xhr.status + ': ' + xhr.statusText);
        }
    });
}

function GroupDDLBind(result, groupId) {
    $("#ddlAccountGroupOuter").html("");
    $('#ddlAccountGroupOuter').html("<select id='ddlAccountGroup' class='form-control'></select> <br />");
    var html = '<option value="-1">Select a Account Group</option>';
    for (var i = 0 ; i < result.length; i++) {
        if (result[i].groupId == groupId) {

            html += "<option value=" + result[i].groupId + " selected='selected'>" + result[i].groupName + "</option>";
        } else {
            html += "<option value=" + result[i].groupId + ">" + result[i].groupName + "</option>";
        }
    }
    $('#ddlAccountGroup').html(html);
    $("input, textarea, select").not('.nostyle').uniform();
}

function BindType(typeId) {
    $.ajax({
        url: '/ChartOfAccount/GetTypeList',
        type: 'GET',
        success: function (data) {
            var result = JSON.parse(data);
            TypeDDLBind(result, typeId);
        },
        error: function (xhr) {
            toastr.options.timeOut = 1500;
            toastr.warning(xhr.status + ': ' + xhr.statusText);
        }
    });
}

function TypeDDLBind(result, typeId) {
    $("#ddlAccountTypeOuter").html("");
    $('#ddlAccountTypeOuter').html("<select id='ddlAccountType' class='form-control'></select> <br />");
    var html = '<option value="-1">Select a Account Type</option>';
    for (var i = 0 ; i < result.length; i++) {
        if (result[i].typeId == typeId)
        {
            html += "<option value=" + result[i].typeId +" selected='selected'>" + result[i].typeName  + "</option>";
        }
        else
        {
            html += "<option value=" + result[i].typeId + ">" + result[i].typeName + "</option>";
        }
    }
    $('#ddlAccountType').html(html);
    $("input, textarea, select").not('.nostyle').uniform();
}

////////////////////////////////////////////////////////////

function Validate() {

    if ($('#txtChartName').val() == '') {
        toastr.options.timeOut = 2500;
        toastr.warning("Name is required.", "Incomplete");
        return false;
    }
    if ($('#ddlAccountGroup').val() == -1) {
        toastr.options.timeOut = 1500;
        toastr.warning("Please Select a Account Group", "Incomplete");
        return false;
    }
    if ($('#ddlAccountType').val() == -1) {
        toastr.options.timeOut = 1500;
        toastr.warning("Please Select a Account Type", "Incomplete");
        return false;
    }

    return true;
}

function ClearAlfterSave() {

    $('#txtChartName').val('');
    $('#ddlAccountTypeOuter').empty();
    $('#ddlAccountTypeOuter').html('<select id="ddlAccountType"><option value="-1">Select a Account Type</option></select>');

    $('#ddlAccountGroupOuter').empty();
    $('#ddlAccountGroupOuter').html('<select id="ddlAccountGroup"><option value="-1">Select a Account Group</option></select>');
    $("input, textarea, select").not('.nostyle').uniform();
}

function ClearAll() {
    $("#btnSave").removeAttr("disabled");
    $('#txtChartId').val('');
    $('#txtChartName').val('');

    $('#ddlAccountTypeOuter').empty();
    $('#ddlAccountTypeOuter').html('<select id="ddlAccountType"><option value="-1">Select a Account Type</option></select>');

    $('#ddlAccountGroupOuter').empty();
    $('#ddlAccountGroupOuter').html('<select id="ddlAccountGroup"><option value="-1">Select a Account Group</option></select>');
    $("input, textarea, select").not('.nostyle').uniform();
}