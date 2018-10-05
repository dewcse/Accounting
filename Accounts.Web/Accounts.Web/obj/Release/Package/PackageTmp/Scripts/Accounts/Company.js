
var editList = new Array();
var table1 = new Array();

$(function () {

    LoadCompanyInfo();
    $('#btnSave').click(function () {
        if (Validate()) {
            var formData = new FormData();
            if ($('#txtCompanyId').val() == '') {
                formData.append("Id",-1);
            }
            else {
                var Id = $('#txtCompanyId').val();
                formData.append("Id", Id);
            }

            var Name = $('#txtName').val();
            var Contact = $('#txtContact').val();
            var Email = $('#txtEmail').val();
            var Address = $('#txtAddress').val();


            formData.append("Name", Name);
            formData.append("Contact", Contact);
            formData.append("Email", Email);
            formData.append("Address", Address);

            var totalFiles = document.getElementById("logoCompany").files.length;
            for (var i = 0; i < totalFiles; i++) {
                var file = document.getElementById("logoCompany").files[i];

                formData.append("FileUpload", file);

            }

            $.blockUI({ message: '<h1><img src="../Resources/Images/busy.gif" /> Wait a moment...</h1>' });
            $.ajax({

                type: 'POST',
                url: insertCompanyInfo,            
                data: formData,
                dataType: 'json',
                contentType: false,
                processData: false,
                success: function (data) {
                    var result = JSON.parse(data);
                    $(document).ajaxStop($.unblockUI);

                    if (result.statusCode == "401") {
                        //logOut();
                    }
                    else if (result.statusCode == "200") {
                        $('#txtCompanyId').val(result.id);
                        ClearAlfterSave();
                        toastr.options.timeOut = 3500;
                        toastr.success(result.statusMessage);
                        $("#btnSave").attr("disabled", true);

                        LoadCompanyInfo();
                    }
                    else {
                        $(document).ajaxStop($.unblockUI);
                        toastr.options.timeOut = 1500;
                        toastr.warning(result.statusCode + ': ' + result.statusMessage);
                    }

                },
                error: function (xhr) {
                    $(document).ajaxStop($.unblockUI);
                    toastr.options.timeOut = 1500;
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

function LoadCompanyInfo()
{
    table1 = '';
    editList = [];

    $.ajax({
        url: '/Company/GetCompanyList',
        type: 'GET',
        success: function (data) {
            var result = JSON.parse(data);
            if (result.length > 0)
            {
                BindCompanyInfo(result);
            }
        },
        error: function (xhr) {
            toastr.options.timeOut = 1500;
            toastr.warning(xhr.status + ': ' + xhr.statusText);
        }
    });
}

function BindCompanyInfo(result) {

    editList = result;

    table1 = "<table width='60%' id='companyDataView' class='table-responsive table table-bordered table-hover cust-header-custom cust-header-custom2 cust-header-custom3 cust-header-custom4 cust-header-custom5' cellspacing='0'> <thead><tr>" +
           "<th style='display:none'>Company Id</th>" +
           "<th width='10%'><b>Company</b></th>" +
           "<th width='15%'><b>Address</b></th>" +
           "<th width='10%'><b>Email</b></th>" +
           "<th width='10%'><b>Contact</b></th>" +
           "<th width='10%'><b>Logo</b></th>" +
           "<th width='5%'><b>Edit</b></th>" +
         "</tr></thead>";

    $('#companyInfoForEdit').html(table1);

    for (var i = 0; i < result.length; i++) {
        $("#companyDataView").append('<tr id="companyData">' +
            '<td style="display:none">' + result[i].id + '</td>' +
            '<td width="10%">' + result[i].name + '</td>' +
            '<td width="15%">' + result[i].address + '</td>' +
            '<td width="10%">' + result[i].email + '</td>' +
            '<td width="10%">' + result[i].contact + '</td>' +
            '<td><img src="' + baseUrl + '/UploadFiles/' + result[i].logoLocation + '" width= "200"  border="10"></td>' +
           //'<td><a href="' + baseUrl + '/UploadFiles/' + result[i].logoLocation + '" target="_blank" onclick="window.open(this.href, "Snopzer","left=20,top=20,width=500,height=500,toolbar=1,resizable=0"); return false;">' + result[i].logoLocation + '</a></td>' +
            '<td width="5%">' + '<button type="button" class="btn btn-success" onclick="EditCompany(' + result[i].id + ')">Edit</button>' + '</td>' +
            '</tr>');
    }
}

function EditCompany(selectedId){

    var list = _.find(editList, function (o) { return o.id == selectedId; })
    $('#txtCompanyId').val(list.id);
    $('#txtName').val(list.name);
    $('#txtContact').val(list.contact);
    $('#txtEmail').val(list.email);
    $('#txtAddress').val(list.address);
    $("#btnSave").removeAttr("disabled");
}

////////////////////////////////////////////////////////////

function Validate() {

    if ($('#txtName').val() == '') {
        toastr.options.timeOut = 2500;
        toastr.warning("Name is required.", "Incomplete");
        return false;
    }

    if ($("#txtContact").val() == '') {
        toastr.options.timeOut = 2500;
        toastr.warning("Contact is required.", "Incomplete");
        return false;
    }

    if ($("#txtAddress").val() == '') {
        toastr.options.timeOut = 2500;
        toastr.warning("Address is required.", "Incomplete");
        return false;
    }

    return true;
}

function ClearAlfterSave() {
    $('#txtName').val('');
    $('#txtContact').val('');
    $('#txtEmail').val('');
    $('#txtAddress').val('');
}

function ClearAll() {

    editList = [];
    table1 = [];
    $('#companyInfoForEdit').html('');
    $("#btnSave").removeAttr("disabled");
    $('#txtCompanyId').val('');
    $('#txtName').val('');
    $('#txtContact').val('');
    $('#txtEmail').val('');
    $('#txtAddress').val('');
}
