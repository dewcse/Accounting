
var chartOfAccount = new Array();
var table1 = '';
var lastRow = '';

$(function () {

    $("#txtDate").val($.datepicker.formatDate('dd M yy', new Date()));
    $("#txtDate").datepicker({ dateFormat: 'dd M yy', maxDate: 0 });

    LoadChartOfAccount();
    LoadJournalVoucherInfo();

    $('#btnSave').click(function () {
        if (Validate()) {
            var data1 = new Object();
            var cells = new Array();

            var rows = $('table#addVoucher').find('tbody').find('tr');
            //    console.log(rows);
            for (var i = 1; i < rows.length; i++) {
                var newChild = new Object();
                newChild.Id = $(rows[i]).find("td:eq(0)").html();
                newChild.TransactionDate = $('#txtDate').val();
                newChild.VoucherNo = $('#lblVoucherNo').val(); 
                newChild.VoucherType = 1;
                newChild.VoucherName = $('#txtVoucherCode').val();
                newChild.AccountCode = $(rows[i]).find('select option:selected').val();
                newChild.Debit = $(rows[i]).find("td:eq(3) input").val();
                newChild.Credit = $(rows[i]).find("td:eq(4) input").val();
                newChild.Description = $(rows[i]).find("td:eq(2) input").val();
                newChild.Narration = $('#txtNarration').val();
                newChild.Reference = $('#txtReference').val();
                newChild.Creator = "Shahriar";

                if (newChild.AccountCode != undefined) {
                        cells.push(newChild);
                }
            }
            data1.ledgerList = cells;

            $.blockUI({ message: '<h1><img src="../Resources/Images/busy.gif" /> Wait a moment...</h1>' });
            $.ajax({

                type: 'POST',
                url: insertJournalVoucher,
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(data1),
                success: function (data) {
                    var result = JSON.parse(data);
                    $(document).ajaxStop($.unblockUI);

                    if (result.statusCode == "401") {
                        //logOut();
                    }
                    else if (result.statusCode == "200") {
                        //$('#txtCompanyId').val(result.id);
                        ClearAlfterSave();
                        toastr.options.timeOut = 3500;
                        toastr.success(result.statusMessage);
                        $("#btnSave").attr("disabled", true);
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

function LoadChartOfAccount() {
    $.ajax({
        url: getChartOfAccountForVoucher,
        type: 'GET',
        success: function (data) {
            var result = JSON.parse(data);
            chartOfAccount = result;
            BindUi(result);
        },
        error: function (xhr) {
            toastr.options.timeOut = 1500;
            toastr.warning(xhr.status + ': ' + xhr.statusText);
        }
    });
}

function LoadJournalVoucherInfo() {
    $.ajax({
        url: getJournalVoucherNo,
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
    table1 = "<table width='50%' id='addVoucher' class='table-responsive table table-bordered table-hover cust-header-custom cust-header-custom2 cust-header-custom3 cust-header-custom4 cust-header-custom5'><tr>" +
   // table1 = "<table width='50%' id='addVoucher' class='display' cellspacing='0' width='50%'><tr>" +
   "<th style='display:none'><b>Id</b></th>" +
   //"<th style='display:none'>Account Type Id</th>" +
   "<th width='15%' style='text-align:center;'><b>Account Type</b></th>" +
   "<th width='15%' style='text-align:center;'><b>Description </b></th>" +
   "<th width='8%' style='text-align:center;'><b>Debit</b></th>" +
   "<th width='8%' style='text-align:center;'><b>Credit</b></th>" +
   "<th width='4%'><b>Delete</b></th>";
    "</tr></table>";

    for (var i = 1; i < 3; i++) {
        table1 = table1 +
        "<tr>" +
        "<td style='display:none'>-1</td>" +
        //"<td style='display:none'>" + 'ddlAccountType'+"</td>" +
        "<td width='15%'>" +
            '<select style="width: 100%;" class="form-control ddlSize" id="ddlAccountType_' + i + '"><option value="-1">Select Account Type</option>';
        var accountGroup = _.groupBy(result, 'groupName');
        for (var g = 0; g < Object.keys(accountGroup).length; g++)
        {
            var accChartList = accountGroup["" + Object.keys(accountGroup)[g] + ""];
            table1 = table1 + "<optgroup label='" + accChartList[0].groupName + "'>";
            for (var j = 0; j < accChartList.length; j++) {
                table1 = table1 + '<option value=' + accChartList[j].id + '>' + accChartList[j].name + '</option>';
            }
            table1 = table1 + "</optgroup>";
        }

        table1 = table1 + '</select>' +
        "</td>" +
            "<td width='15%'>" + '<input type="text  class="fields" style="width: 100%;"  id="txtDescription" />' + "</td>" +
            "<td width='8%'>" + '<input type="text  class="fields" style="width: 100%;"  id="txtDebit" value="0" onblur="TotalDebit()" onkeypress="javascript:return isNumber(event)"/>' + "</td>" +
            "<td width='8%'>" + '<input type="text  class="fields" style="width: 100%;" id="txtCredit" value="0" onblur="TotalCredit()" onkeypress="javascript:return isNumber(event)"/>' + "</td>" +
            "<td width='4%'>" + '<input type="button" class="btn btn-info" id="deleteRow"  value="Delete" onclick="DeleteRow()"></button>' + "</td>";
        "</tr>";
        //$('#addVoucher').DataTable();
    }
    table1 = table1 + "</table>";
    $('#chartOfAccountDiv').html(table1);
    //AddLastRow();
}

function AddRow()
{
    //$('table#addVoucher tr#lastRow').remove();
    var rows = $('table#addVoucher').find('tbody').find('tr');
    var ddlCount = rows.length - 1;
    var result = chartOfAccount;
    for (var i = 0; i < 1; i++) {
        var k = ddlCount + i;
        var table2 = table2 +
       "<tr>" +
       "<td style='display:none'>-1</td>" +
       //"<td style='display:none'>" + 'ddlAccountType_' + i + "</td>" +
       "<td width='15%'>" +
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
            "<td width='15%'>" + '<input type="text  class="fields" style="width: 100%;"  id="txtDescription' + i + '" />' + "</td>" +
            "<td width='8%'>" + '<input type="text  class="fields" style="width: 100%;"  id="txtDebit' + i + '" value="0" onblur="TotalDebit()" onkeypress="javascript:return isNumber(event)"/>' + "</td>" +
            "<td width='8%'>" + '<input type="text  class="fields" style="width: 100%;" id="txtCredit' + i + '" value="0" onblur="TotalCredit()" onkeypress="javascript:return isNumber(event)"/>' + "</td>" +
            "<td width='4%'>" + '<input type="button" class="btn btn-info" value="Delete" onclick="DeleteRow()"></button>' + "</td>";
        "</tr>";
    }
    $("#addVoucher").append(table2);
    //AddLastRow();
}

function AddLastRow()
{
    var result = chartOfAccount;
    var lastRow =
   "<tr id='lastRow'>" +
   "<td style='display:none'>-1</td>" +
   //<button class="btn btn-info" id="btnAdd" name="Add" onclick="AddRow()"><b>Add</b></button>
   "<td width='15%'>" + '<input type="button" class="btn btn-info" value="Add Row" onclick="AddRow()"></button>' + "</td>" +
        "<td width='15%'></td>" +
        "<td width='8%' id='txtTotalDebit'>" + '<input type="text  class="fields" style="width: 100%;"  id="txtDebit' + i + '" value="0" onkeypress="javascript:return isNumber(event)"/>' + "</td>" +
        "<td width='8%' id ='txtTotalCredit'>" + '<input type="text  class="fields" style="width: 100%;" id="txtCredit' + i + '" value="0" onkeypress="javascript:return isNumber(event)"/>' + "</td>" +
        "<td width='4%'></td>";
    "</tr>";
    $("#addVoucher").append(lastRow);
}

function DeleteRow() {
    $(this).closest('tr').remove();
    return false;
}

function TotalDebit()
{
    var rows = $('table#addVoucher').find('tbody').find('tr');

    if (rows.length > 0) {
        var debit = 0, totalDr = 0;

        for (var i = 1; i < rows.length; i++) {
            debit = parseFloat($(rows[i]).find("td:eq(3) input").val());
            if (isNaN(debit)) {
                debit = 0
            }
            totalDr = parseFloat(totalDr) + parseFloat(debit);
        }
        $('#txtTotalDebit').val(totalDr);
    }
}

function TotalCredit()
{
    var rows = $('table#addVoucher').find('tbody').find('tr');

    if (rows.length > 0) {
        var credit = 0, totalCr = 0;

        for (var i = 1; i < rows.length; i++) {
            credit = parseFloat($(rows[i]).find("td:eq(4) input").val());
            if (isNaN(credit)) {
                credit = 0
            }
            totalCr = parseFloat(totalCr) + parseFloat(credit);
        }
        $('#txtTotalCredit').val(totalCr);

    }
}

////////////////////////////////////////////////////////////

function Validate() {

    if ($('#txtReference').val() == '') {
        toastr.options.timeOut = 3500;
        toastr.warning("Reference is required.", "Incomplete");
        return false;
    }
    if ($('#txtNarration').val() == '') {
        toastr.options.timeOut = 3500;
        toastr.warning("Narration is required.", "Incomplete");
        return false;
    }

    if (parseFloat($("#txtTotalDebit").val()) != parseFloat($("#txtTotalCredit").val())) {
        toastr.options.timeOut = 3500;
        toastr.warning("Total Value of Debit & Credit is not Same.", "Incomplete");
        return false;
    }
    var rows = $('table#addVoucher').find('tbody').find('tr');

    if (rows.length > 0) {
        var balanceQty = 0, debit=0, credit=0, totalCr = 0, totalDr = 0;

        for (var i = 1; i < rows.length; i++) {
            debit = parseInt($(rows[i]).find("td:eq(3) input").val());
            credit = parseInt($(rows[i]).find("td:eq(4) input").val());

            if (isNaN(debit)) {
                debit = 0
            }
            if (isNaN(credit)) {
                credit = 0
            }
            totalDr = parseInt(totalDr) + parseInt(debit);
            totalCr = parseInt(totalCr) + parseInt(credit);
        }
        if (parseInt(totalDr) <= 0) {
            toastr.options.timeOut = 3500;
            toastr.warning('Total Debit not should be Zero..');
            return false;
        }
        if (parseInt(totalCr) <= 0) {
            toastr.options.timeOut = 3500;
            toastr.warning('Total Credit not should be Zero..');
            return false;
        }
        balanceQty = parseInt(totalDr) - parseInt(totalCr);
        if (parseInt(balanceQty) != 0) {
            toastr.options.timeOut = 3500;
            toastr.warning('Total Debit & Credit Quantity not same..');
            return false;
        }
    }

    return true;
}

function ClearAlfterSave() {
    //$('#txtDate').val('');
    //$('#txtReference').val('');
    //$('#txtNarration').val('');
    //$('#txtNote').val('');
    //$('#txtDate').val('');
    //$('#lblVoucherNo').val('');
    //$('#lblVoucherType').val('');
    //$('#txtVoucherCode').val('');

    //$('#txtTotalDebit').val('');
    //$('#txtTotalCredit').val('');

    //$('#chartOfAccountDiv').html('');
    //LoadChartOfAccount();
    //LoadJournalVoucherInfo();
    //$("#txtDate").val($.datepicker.formatDate('dd M yy', new Date()));
    //$("#txtDate").datepicker({ dateFormat: 'dd M yy', maxDate: 0 });
}

function ClearAll() {
    $("#btnSave").removeAttr("disabled");
    $('#txtVoucherCode').val('');
    $('#txtDate').val('');
    $('#txtReference').val('');
    $('#txtNarration').val('');
    $('#lblVoucherNo').html('');
    $('#lblVoucherType').html('');
    $('#txtTotalDebit').val('');
    $('#txtTotalCredit').val('');
    $('#txtVoucherCode').val('');

    $('#chartOfAccountDiv').html('');

    LoadChartOfAccount();
    LoadJournalVoucherInfo();
    $("#txtDate").val($.datepicker.formatDate('dd M yy', new Date()));
    $("#txtDate").datepicker({ dateFormat: 'dd M yy', maxDate: 0 });
}
