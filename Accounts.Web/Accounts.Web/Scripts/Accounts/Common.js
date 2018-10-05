
var baseUrl = '';

var insertCompanyInfo = baseUrl + '/Company/InsertCompanyInfo';

var insertChartOfAccountInfo = baseUrl + '/ChartOfAccount/InsertChartOfAccountInfo';
var editChartOfAccount          = baseUrl + '/ChartOfAccount/ChartOfAccountEdit';
var getChartOfAccount           = baseUrl + '/ChartOfAccount/GetChartOfAccountList';

var getChartOfAccountForVoucher = baseUrl + '/Voucher/GetChartOfAccount';
var getCashOfAccount            = baseUrl + '/Voucher/GetCashOfAccount';

var getPaymentVoucherNo         = baseUrl + '/Voucher/GetPaymentVoucherNo';
var getJournalVoucherNo         = baseUrl + '/Voucher/GetJournalVoucherNo';
var getReceiptVoucherNo         = baseUrl + '/Voucher/GetReceiptVoucherNo';

var insertJournalVoucher        = baseUrl + '/Voucher/InsertJournalVoucher';
var insertPaymentVoucher        = baseUrl + '/Voucher/InsertPaymentVoucher';
var insertReceiptVoucher        = baseUrl + '/Voucher/InsertReceiptVoucher';

var ledgerListForView           = baseUrl + '/Voucher/GetLedgerList';
var viewVoucherReport           = baseUrl + '/Voucher/VoucherReport';
var viewVoucherReport_HTML      = baseUrl + '/Voucher/VoucherReport_HTML';
var reportView = baseUrl + '/Voucher/JournalReports';
var trailBalance_HTML = baseUrl + '/Voucher/TrailBalance_HTML';
var incomeStatement_HTML = baseUrl + '/Voucher/IncomeStatement_HTML';
var balanceSheet_HTML = baseUrl + '/Voucher/BalanceSheet_HTML';

var insertLoanInfo = baseUrl + '/Loan/InsertLoanInfo';
var viewLoanInfo = baseUrl + '/Loan/ViewLoanInfo';

function isNumber(evt) {
    var iKeyCode = (evt.which) ? evt.which : evt.keyCode;
    if (iKeyCode != 46 && iKeyCode > 31 && (iKeyCode < 48 || iKeyCode > 57))
        return false;

    return true;
}

function isIntNumber(e) {
    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57))
        return false;

    return true;
}

function setCookie(cname, cvalue, exdays) {
    var x = "Cookies enabled: " + navigator.cookieEnabled;
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

function GetParameterValues(param) {
    var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < url.length; i++) {
        var urlparam = url[i].split('=');
        if (urlparam[0] == param) {
            return urlparam[1];
        }
    }
}

