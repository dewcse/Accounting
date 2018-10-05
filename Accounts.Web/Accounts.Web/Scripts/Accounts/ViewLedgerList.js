
$(function () {
    var d = new Date();
    d.setDate(d.getDate() - 3);

    $("#toDate").val($.datepicker.formatDate("dd M yy", new Date()));
    $("#fromDate").val($.datepicker.formatDate('dd M yy', d));

    $("#fromDate").datepicker({ dateFormat: 'dd M yy', maxDate: 0 });
    $("#toDate").datepicker({ dateFormat: 'dd M yy', maxDate: 0 });

    LedgerListForView();

    $("#btnView").click(function () {
        var data1 = new Object();
        data1.fromDate = $('#fromDate').val();
        data1.toDate = $('#toDate').val();
        data1.voucherType = $('input[name=ledgerList]:checked').val();

        if (data1.voucherType >= 0) { data1.fromDate = '01/01/2000'; data1.toDate = '01/01/2020'; }

        $.ajax({
            url: ledgerListForView,
            type: 'GET',
            data: data1,
            success: function (data) {
                var list = JSON.parse(data);
                console.log(list);
                if (list.statusCode == '200') {
                    BindTable(list.ledgerListForView);
                }
                else {
                    toastr.options.timeOut = 3500;
                    toastr.warning(list.statusMessage);
                }
            },
            error: function (xhr) {
                toastr.options.timeOut = 3500;
                toastr.warning(xhr.status + ': ' + xhr.statusText);
            }
        });

    })
})

function LedgerListForView() {

    var d = new Date();
    d.setDate(d.getDate() - 3);

    var fDate = $.datepicker.formatDate("dd/mm/yy", d);
    var tDate = $.datepicker.formatDate("dd/mm/yy", new Date());
    var data1 = new Object();
    data1.fromDate = fDate;
    data1.toDate = tDate;
    //data1.voucherType = -1;

    $.ajax({
        url: ledgerListForView,
        type: 'GET',
        data: data1,
        success: function (data) {
            var list = JSON.parse(data);
            console.log(list);
            if (list.statusCode == '200')
            {
                BindTable(list.ledgerListForView);
            }
            else {
                toastr.options.timeOut = 3500;
                toastr.warning(list.statusMessage);
            }
        },
        error: function (xhr) {
            toastr.options.timeOut = 3500;
            toastr.warning(xhr.status + ': ' + xhr.statusText);
        }
    });
}

function BindTable(result) {

    //console.log(result);

    table1 = "<table width='100%' id='ledgerDataView' class='table-responsive table table-bordered table-hover cust-header-custom cust-header-custom2 cust-header-custom3 cust-header-custom4 cust-header-custom5' cellspacing='0'> <thead><tr>" +
       "<th style='display:none'>Voucher No</th>" +
       "<th style='display:none'>Voucher Type</th>" +
       "<th width='15%'><b>Transaction Date</b></th>" +
       "<th width='15%'><b>Voucher Type</b></th>" +
       "<th width='15%'><b>Description</b></th>" +
       "<th width='15%'><b>Narration</b></th>" +
       "<th width='14%'><b>Reference</b></th>" +
       "<th width='8%'><b>Debit</b></th>" +
       "<th width='8%'><b>Credit</b></th>" +
       "<th width='5%'><b>Edit</b></th>" +
       "<th width='5%'><b>View</b></th>" +
     "</tr></thead>";

    $('#ledgerList').html(table1);

    for (var i = 0; i < result.length; i++) {
        $("#ledgerDataView").append("<tr id='chartData'>" +
            "<td style='display:none'>" + result[i].voucherNo + "</td>" +
            "<td style='display:none'>" + result[i].voucherType + "</td>" +
            "<td width='15%'>" + result[i].transactionDate + " </td>" +
            "<td width='15%'>" + result[i].voucherName + "</td>" +
            "<td width='15%'>" + result[i].description + "</td>" +
            "<td width='15%'>" + result[i].narration + "</td>" +
            "<td width='14%'>" + result[i].reference + "</td>" +
            "<td width='8%'>" + result[i].debit + "</td>" +
            "<td width='8%'>" + result[i].credit + "</td>" +
            "<td width='5%'>" + '<button type="button" class="btn btn-success" onclick="EditVoucher(' + result[i].voucherNo + ',' + result[i].voucherType + ')">Edit</button>' + "</td>" +
            "<td width='5%'>" + '<button type="button" class="btn btn-info" onclick="ViewVoucher(' + result[i].voucherNo + ',' + result[i].voucherType + ')">View</button>' + "</td>" +
            "</tr>");
    }
}

function EditVoucher(voucherNo, voucherType)
{

}

function ViewVoucher(voucherNo, voucherType)
{
    var data1 = new Object();
    data1.voucherNo = voucherNo;
    data1.voucherType = voucherType;
    var url = viewVoucherReport;
    url = url + '?VoucherNo=' + data1.voucherNo + '&VoucherType=' + data1.voucherType;
    window.open(url, '_blank');
}