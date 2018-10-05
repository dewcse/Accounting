
var groupList = [];

$(function () {

    BindGroup();
    BindType();

    $('#btnSave').click(function () {
        if (Validate()) {
            var data1 = new Object();
            if ($('#txtChartId').val() == '') {
                data1.Id = -1;
            }
            else {
                data1.Id = $('#txtChartId').val();
            }
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

function BindType() {
    $.ajax({
        url: '/ChartOfAccount/GetTypeList',
        type: 'GET',
        success: function (data) {
            var result = JSON.parse(data);
            TypeDDLBind(result);
        },
        error: function (xhr) {
            toastr.options.timeOut = 3500;
            toastr.warning(xhr.status + ': ' + xhr.statusText);
        }
    });
}

function BindGroup() {

    $.ajax({
        url: '/ChartOfAccount/GetGroupList',
        type: 'GET',
        success: function (data) {
            groupList = JSON.parse(data);
            //GroupDDLBind(result);
        },
        error: function (xhr) {
            toastr.options.timeOut = 1500;
            toastr.warning(xhr.status + ': ' + xhr.statusText);
        }
    });
}

function TypeDDLBind(result) {
    $("#ddlAccountTypeOuter").html("");
    $('#ddlAccountTypeOuter').html("<select id='ddlAccountType' class='form-control' onchange='GroupDDLBind(this)'></select> <br />");
    var html = '<option value="-1">Select a Account Type</option>';
    for (var i = 0 ; i < result.length; i++) {
        html += "<option value=" + result[i].typeId + ">" + result[i].typeName + "</option>";
    }
    $('#ddlAccountType').html(html);
    $("input, textarea, select").not('.nostyle').uniform();
}


function GroupDDLBind(ddlAccountType) {
    var accType = ddlAccountType.value;
    $("#ddlAccountGroupOuter").html("");
    $('#ddlAccountGroupOuter').html("<select id='ddlAccountGroup' class='form-control'></select> <br />");
    var html = '<option value="-1">Select a Account Group</option>';

    if (accType == 1) {
        var list = _.filter(groupList, function (item, index) {
            return _.contains([2, 3], item.groupId);
        })
    }
    else if (accType == 2) {
        var list = _.filter(groupList, function (item, index) {
            return _.contains([1], item.groupId);
        })
    }
    else {
        var list = _.filter(groupList, function (item, index) {
            return _.contains([1, 4], item.groupId);
        })
    }

    for (var i = 0 ; i < list.length; i++) {
        html += "<option value=" + list[i].groupId + ">" + list[i].groupName + "</option>";
    }
    $('#ddlAccountGroup').html(html);
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

    BindGroup();
    BindType();
    groupList = [];
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

    BindGroup();
    BindType();
}
