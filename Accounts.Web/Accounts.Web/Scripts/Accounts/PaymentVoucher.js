
var chartOfAccount = new Array();
var cashOfAccount = new Array();
var table1 = '';
var lastRow = '';
var saveID = 0;

$(function () {

    $("#txtDate").val($.datepicker.formatDate('dd M yy', new Date()));
    $("#txtDate").datepicker({ dateFormat: 'dd M yy', maxDate: 0 });

    LoadCashOfAccount();
    LoadChartOfAccount();
    LoadPaymentVoucherInfo();

    $('#btnSave').click(function () {
        if (Validate()) {
            var data1 = new Object();
            var ledgerCells = new Array();
            var voucherCells = new Array();

            var rows = $('table#addVoucher').find('tbody').find('tr');

            for (var i = 1; i < rows.length; i++) {
                var ledgerChild = new Object();
                var voucherChild = new Object();

                ledgerChild.Id = $(rows[i]).find("td:eq(0)").html();
                ledgerChild.TransactionDate = $('#txtDate').val();
                ledgerChild.VoucherNo = $('#lblVoucherNo').val();
                ledgerChild.VoucherType = $('#lblVoucherType').val();
                ledgerChild.VoucherName = $('#txtVoucherCode').val();
                ledgerChild.AccountCode = $(rows[i]).find('select option:selected').val();
                ledgerChild.Debit = $(rows[i]).find("td:eq(5) input").val();
                ledgerChild.Credit = 0;
                ledgerChild.Description = $(rows[i]).find("td:eq(2) input").val();
                ledgerChild.Narration = '';
                ledgerChild.Reference = $('#txtReference').val();
                ledgerChild.Creator = "Shahriar";


                voucherChild.Id = $(rows[i]).find("td:eq(0)").html();
                voucherChild.VoucherNo = $('#lblVoucherNo').val();
                voucherChild.VoucherType = 2;
                voucherChild.VoucherName = $('#txtVoucherCode').val();
                voucherChild.CashOfAccountType = $('#ddlPaidFrom').val();
                voucherChild.Payable = $('#txtPayable').val();
                voucherChild.Note = $('#txtNote').val();
                voucherChild.AccountCode = $(rows[i]).find('select option:selected').val();
                voucherChild.Description = $(rows[i]).find("td:eq(2) input").val();
                voucherChild.Quantity = $(rows[i]).find("td:eq(3) input").val();
                voucherChild.UnitPrice = $(rows[i]).find("td:eq(4) input").val();
                voucherChild.Amount = $(rows[i]).find("td:eq(5) input").val();

                if (ledgerChild.AccountCode != undefined) {
                    ledgerCells.push(ledgerChild);
                    voucherCells.push(voucherChild);
                }
            }
            data1.ledgerList = ledgerCells;
            data1.voucherList = voucherCells;

            $.blockUI({ message: '<h1><img src="../Resources/Images/busy.gif" /> Wait a moment...</h1>' });
            $.ajax({

                type: 'POST',
                url: insertPaymentVoucher,
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(data1),
                success: function (data) {
                    var result = JSON.parse(data);
                    $(document).ajaxStop($.unblockUI);

                    if (result.statusCode == "200") {
                        //$('#txtCompanyId').val(result.id);
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

function LoadCashOfAccount() {
    $.ajax({
        url: getCashOfAccount,
        type: 'GET',
        success: function (data) {
            var result = JSON.parse(data);
            cashOfAccount = result;
            BindCashOfAccount(cashOfAccount);
        },
        error: function (xhr) {
            toastr.options.timeOut = 1500;
            toastr.warning(xhr.status + ': ' + xhr.statusText);
        }
    });
}

function LoadChartOfAccount() {
    $.ajax({
        url: getChartOfAccountForVoucher,
        type: 'GET',
        success: function (data) {
            var result = JSON.parse(data);
            chartOfAccount = _.filter(result, function (val) { return val.groupId == 3; });
            BindUi(chartOfAccount);
        },
        error: function (xhr) {
            toastr.options.timeOut = 1500;
            toastr.warning(xhr.status + ': ' + xhr.statusText);
        }
    });
}

function BindCashOfAccount(cashOfAccount) {

    $('#ddlPaidFromOuter').html("<select id='ddlPaidFrom' class='form-control'></select>");
    var html = '<option value="-1">Select Cash of Account</option>';
    for (var i = 0; i < cashOfAccount.length; i++) {
        html += "<option value=" + cashOfAccount[i].id + " >" + cashOfAccount[i].name + "</option>";
    }
    $('#ddlPaidFrom').html(html);
    $("input, textarea, select").not('.nostyle').uniform();
}

function LoadPaymentVoucherInfo() {
    $.ajax({
        url: getPaymentVoucherNo,
        type: 'GET',
        success: function (data) {
            var result = JSON.parse(data);
            console.log(result);
            $('#txtVoucherCode').val(result.voucherName);
            $('#lblVoucherType').val(result.voucherType);
            $('#lblVoucherNo').val(result.voucherNo);
        },
        error: function (xhr) {
            toastr.options.timeOut = 1500;
            toastr.warning(xhr.status + ': ' + xhr.statusText);
        }
    });
}

function BindUi(result) {
    table1 = "<table width='60%' id='addVoucher' class='table-responsive table table-bordered table-hover cust-header-custom cust-header-custom2 cust-header-custom3 cust-header-custom4 cust-header-custom5'><tr>" +
   // table1 = "<table width='50%' id='addVoucher' class='display' cellspacing='0' width='50%'><tr>" +
   "<th style='display:none'><b>Id</b></th>" +
   "<th width='15%' style='text-align:center;'><b>Account Type</b></th>" +
   "<th width='15%' style='text-align:center;'><b>Description </b></th>" +
   "<th width='8%' style='text-align:center;'><b>Quantity</b></th>" +
   "<th width='8%' style='text-align:center;'><b>Unit Price</b></th>" +
   "<th width='8%' style='text-align:center;'><b>Amount</b></th>" +
   "<th width='4%' style='text-align:center;'><b>Delete</b></th>";
    "</tr></table>";

    for (var i = 1; i < 2; i++) {
        table1 = table1 +
        "<tr>" +
        "<td style='display:none'>-1</td>" +
        //"<td style='display:none'>" + 'ddlAccountType'+"</td>" +
        "<td width='15%' style='text-align:center;'>" +
            '<select style="width: 100%;" class="form-control ddlSize" id="ddlAccountType_' + i + '"><option value="-1">Select Account Type</option>';
        var accountGroup = _.groupBy(result, 'groupName');
        for (var g = 0; g < Object.keys(accountGroup).length; g++) {
            var accChartList = accountGroup["" + Object.keys(accountGroup)[g] + ""];
            table1 = table1 + "<optgroup label='" + accChartList[0].groupName + "'>";
            for (var j = 0; j < accChartList.length; j++) {
                table1 = table1 + '<option value=' + accChartList[j].id + '>' + accChartList[j].name + '</option>';
            }
            table1 = table1 + "</optgroup>";
        }

        table1 = table1 + '</select>' +
        "</td>" +
            "<td width='15%'>"+ '<input type="text  class="fields" style="width: 100%;"  id="txtDescription" />' + "</td>" +
            "<td width='8%'>" + '<input type="text  class="fields" style="width: 100%;"  id="txtQuantity" onblur="CalculateAmount()" onkeypress="javascript:return isNumber(event)"/>' + "</td>" +
            "<td width='8%'>" + '<input type="text  class="fields" style="width: 100%;"  id="txtUnitPrice" onblur="CalculateAmount()" onkeypress="javascript:return isNumber(event)"/>' + "</td>" +
            "<td width='8%'>" + '<input type="text  class="fields" style="width: 100%;"  id="txtAmount" onblur="CalculateAmount()" onkeypress="javascript:return isNumber(event)"/>' + "</td>" +
            "<td width='4%'>" + '<input type="button" class="btn btn-info" id="deleteRow"  value="Delete" onclick="DeleteRow()"></button>' + "</td>";
        "</tr>";
        //$('#addVoucher').DataTable();
    }
    table1 = table1 + "</table>";
    $('#chartOfAccountDiv').html(table1);
    //AddLastRow();
}

function AddRow() {
    //$('table#addVoucher tr#lastRow').remove();
    var rows = $('table#addVoucher').find('tbody').find('tr');
    var ddlCount = rows.length - 1;
    var result = chartOfAccount;
    for (var i = 0; i < 1; i++) {
        var k = ddlCount + i;
        var table2 = table2 +
        "<tr>" +
        "<td style='display:none'>-1</td>" +
        //"<td style='display:none'>" + 'ddlAccountType'+"</td>" +
        "<td width='15%' style='text-align:center;'>" +
            '<select style="width: 100%;" class="form-control ddlSize" id="ddlAccountType_' + i + '"><option value="-1">Select Account Type</option>';
        var accountGroup = _.groupBy(result, 'groupName');
        for (var g = 0; g < Object.keys(accountGroup).length; g++) {
            var accChartList = accountGroup["" + Object.keys(accountGroup)[g] + ""];
            table2 = table2 + "<optgroup label='" + accChartList[0].groupName + "'>";
            for (var j = 0; j < accChartList.length; j++) {
                table2 = table2 + '<option value=' + accChartList[j].id + '>' + accChartList[j].name + '</option>';
            }
            table2 = table2 + "</optgroup>";
        }

        table2 = table2 + '</select>' +
        "</td>" +
            "<td width='15%'>" + '<input type="text  class="fields" style="width: 100%;"  id="txtDescription" />' + "</td>" +
            "<td width='8%'>" + '<input type="text  class="fields" style="width: 100%;"  id="txtQuantity" onblur="CalculateAmount()" onkeypress="javascript:return isNumber(event)"/>' + "</td>" +
            "<td width='8%'>" + '<input type="text  class="fields" style="width: 100%;"  id="txtUnitPrice" onblur="CalculateAmount()" onkeypress="javascript:return isNumber(event)"/>' + "</td>" +
            "<td width='8%'>" + '<input type="text  class="fields" style="width: 100%;" id="txtAmount" value="0" onblur="CalculateAmount()" onkeypress="javascript:return isNumber(event)"/>' + "</td>" +
            "<td width='4%'>" + '<input type="button" class="btn btn-info" id="deleteRow"  value="Delete" onclick="DeleteRow()"></button>' + "</td>";
        "</tr>";
        //$('#addVoucher').DataTable();
    }
    $("#addVoucher").append(table2);
    //AddLastRow();
}

function DeleteRow() {
    $(this).closest('tr').remove();
    return false;
}

function CalculateAmount()
{
    var rows = $('table#addVoucher').find('tbody').find('tr');

    if (rows.length > 0) {
        var quantity =0, unitPrice=0, amount = 0, calAmount = 0, totalAmount = 0;

        for (var i = 1; i < rows.length; i++) {
            quantity = parseFloat($(rows[i]).find("td:eq(3) input").val());
            unitPrice = parseFloat($(rows[i]).find("td:eq(4) input").val());
            if (isNaN(quantity)) { quantity = 0 }
            if (isNaN(unitPrice)) { unitPrice = 0 }

            if (unitPrice > 0) { calAmount = quantity * unitPrice; }

            if (calAmount == 0)
            {
                amount = parseFloat($(rows[i]).find("td:eq(5) input").val());
                if (isNaN(amount)) { amount = 0 } else { amount = amount; }
            }
            else {
                amount = calAmount;
            }
            $(rows[i]).find("td:eq(5) input").val(amount);

            totalAmount = parseFloat(totalAmount) + parseFloat(amount);
        }
        $('#txtTotalAmount').val(totalAmount);
    }
}

////////////////////////////////////////////////////////////

function Validate() {

    if (saveID == -1) {
        toastr.warning("Data already saved..");
        return false;
    }
    if ($('#txtReference').val() == '') {
        toastr.options.timeOut = 3500;
        toastr.warning("Reference is required.", "Incomplete");
        return false;
    }
    if ($('#ddlPaidFrom').val() == -1) {
        toastr.options.timeOut = 3500;
        toastr.warning("Cash Account selection for Paid From is required.", "Incomplete");
        return false;
    }

    var rows = $('table#addVoucher').find('tbody').find('tr');

    if (rows.length > 0) {
        var amount=0, totalAmount = 0;

        for (var i = 1; i < rows.length; i++) {
            amount = parseInt($(rows[i]).find("td:eq(5) input").val());
            if (isNaN(amount)) {
                amount = 0
            }
            totalAmount = parseInt(totalAmount) + parseInt(amount);
        }
        if (parseInt(totalAmount) <= 0) {
            toastr.options.timeOut = 3500;
            toastr.warning('Total Amount not should be Zero..');
            return false;
        }
    }

    return true;
}

function ClearAlfterSave() {

    saveID = -1;
    chartOfAccount = [];
    cashOfAccount = [];
    table1 = '';
    lastRow = '';

    //$('#txtDate').val('');
    //$('#txtReference').val('');
    //$('#lblVoucherNo').html('');
    //$('#lblVoucherType').html('');
    //$('#txtTotalAmount').val('');
    //$('#txtPayable').val('');
    //$('#txtNote').val('');
    //$('#chartOfAccountDiv').html();

    //$('#ddlPaidFromOuter').empty();
    //$('#ddlPaidFromOuter').html('<select id="ddlPaidFrom"><option value="-1">Select Cash of Account</option></select>');
    //$("input, textarea, select").not('.nostyle').uniform();

    //LoadCashOfAccount();
    //LoadChartOfAccount();
    //LoadPaymentVoucherInfo();
    //$("#txtDate").val($.datepicker.formatDate('dd M yy', new Date()));
    //$("#txtDate").datepicker({ dateFormat: 'dd M yy', maxDate: 0 });
}

function ClearAll() {

    saveID = 0;
    chartOfAccount = [];
    cashOfAccount = [];
    table1 = '';
    lastRow = '';

    $("#btnSave").removeAttr("disabled");
    $('#txtVoucherCode').val('');
    $('#txtDate').val('');
    $('#txtReference').val('');
    $('#lblVoucherNo').html('');
    $('#lblVoucherType').html('');
    $('#txtTotalAmount').val('');
    $('#txtPayable').val('');
    $('#txtNote').val('');
    $('#chartOfAccountDiv').html();

    $('#ddlPaidFromOuter').empty();
    $('#ddlPaidFromOuter').html('<select id="ddlPaidFrom"><option value="-1">Select Cash of Account</option></select>');
    $("input, textarea, select").not('.nostyle').uniform();

    LoadCashOfAccount();
    LoadChartOfAccount();
    LoadPaymentVoucherInfo();
    $("#txtDate").val($.datepicker.formatDate('dd M yy', new Date()));
    $("#txtDate").datepicker({ dateFormat: 'dd M yy', maxDate: 0 });
}
