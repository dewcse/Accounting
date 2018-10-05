
$(function () {

    ChartOfAccountList();
})

function ChartOfAccountList() {
        $.ajax({
            url:  '/ChartOfAccount/GetChartOfAccountList',
            type: 'GET',
            success: function (data) {
                var result = JSON.parse(data);
                BindTable(result);
            },
            error: function (xhr) {
                toastr.options.timeOut = 1500;
                toastr.warning(xhr.status + ': ' + xhr.statusText);
            }
        });
    }

function BindTable(result)
{
    table1 = "<table width='50%' id='chartOfAccountDataView' class='table-responsive table table-bordered table-hover cust-header-custom cust-header-custom2 cust-header-custom3 cust-header-custom4 cust-header-custom5' cellspacing='0'> <thead><tr>" +
       "<th style='display:none'>Chart Id</th>" +
       "<th width='15%'><b>Account Group</b></th>" +
       "<th width='15%'><b>Account Type</b></th>" +
       "<th width='15%'><b>Name</b></th>" +
       "<th width='5%'><b>Edit</b></th>" +
     "</tr></thead>";

    $('#chartOfAccountViewForEdit').html(table1);

    for (var i = 0; i < result.length; i++) {
        $("#chartOfAccountDataView").append("<tr id='chartData'>" +
            "<td style='display:none'>" + result[i].id + "</td>" +
            "<td width='15%'>" + result[i].groupName + " </td>" +
            "<td width='15%'>" + result[i].typeName + "</td>" +
            "<td width='15%'>" + result[i].name + "</td>" +
            "<td width='5%'>" + '<button type="button" class="btn btn-success" onclick="EditChartOfAccount(' + result[i].id + ')">Edit</button>' + "</td>" +
            "</tr>");
    }
}

function EditChartOfAccount(id) {
    setCookie('ChartId', id, 7);
    window.location.href = editChartOfAccount;
}