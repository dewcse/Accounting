
//var loanList = new Array();
var table1;

$(function () {

    LoadLoanInfo();

    $(document).on("click", "#btnSumbitPayment", function (event) {
        var loanId = $("#txtLoanId").val();
        var amount = $("#txtAmount").val();
       
    });
})

function LoadLoanInfo()
{
    $.ajax({

        url: viewLoanInfo,
        type: 'POST',
        success: function (data) {
            var result = JSON.parse(data);
            if (result.statusCode == "200") {
                $(document).ajaxStop($.unblockUI);
                BindUi(result.loanList);
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
    })
}

function BindUi(result) {
    table1 = "<table width='100%' id='loanView' class='table-responsive table table-bordered table-hover cust-header-custom cust-header-custom2 cust-header-custom3 cust-header-custom4 cust-header-custom5' cellspacing='0'> <thead><tr>" +
       "<th style='display:none'>ID</th>" +
       "<th width='15%'><b>Loan Information</b></th>" +
       "<th width='10%'><b>Amount</b></th>" +
       "<th width='15%'><b>Interest</b></th>" +
       "<th width='15%'><b>Total Amount</b></th>" +
       "<th width='14%'><b>Total Payment</b></th>" +
       "<th width='5%'><b>View</b></th>" +
     "</tr></thead>";

    $('#loanListView').html(table1);

    //loanList = result;

    for (var i = 0; i < result.length; i++) {
        $("#loanView").append("<tr id='chartData'>" +
            "<td style='display:none'>" + result[i].loanId + "</td>" +
            "<td width='15%'>" + result[i].loanInformation + " </td>" +
            "<td width='15%'>" + result[i].amount + "</td>" +
            "<td width='15%'>" + result[i].interest + "</td>" +
            "<td width='15%'>" + result[i].totalCashIn + "</td>" +
            "<td width='14%'>" + result[i].totalCashOut + "</td>" +
            '<td width="5%">' + "<button type='button' class='btn btn-info' onclick='PayLoan(" + result[i].loanId + ",\"" + result[i].loanInformation + "\")' data-toggle='modal' data-target='#myModal'>Pay</button>" + '</td>' +
            "</tr>");
    }
}

function PayLoan(loanId, loanInformation) {

    //var selectedList = _.filter(loanList, function (val) { return val.loanId == loanId; });
   var modal = "<div class='modal fade' id='myModal' role='dialog'>"+
              "<div class='modal-dialog modal-sm'>"+
              "<div class='modal-content'>"+
              "<div class='modal-header'>"+
              "<button type='button' class='close' data-dismiss='modal'>&times;</button>"+
              "<h4 class='modal-title'>Loan Information: " + loanInformation + "</h4>" +
              "</div>"+
              "<div class='modal-body'><div class='form-group'>" +
              "<label class='control-label col-md-4'>Amount: </label>"+
              "<div class='col-md-8'>" +
                    "<input type='hidden' id='txtLoanId' value='"+loanId+"'/>" +
                    "<input type='text' id='txtAmount' value='0'/>"+
              "</div>"+
              "</div></div>" +
              "<div class='modal-footer'>"+
                    "<input type='button' class='btn btn-default' id='btnSumbitPayment' value='Submit' />"
                "</div>"+
            "</div>"+
        "</div>"+
    "</div>";

   $('#modalShow').html(modal);
}