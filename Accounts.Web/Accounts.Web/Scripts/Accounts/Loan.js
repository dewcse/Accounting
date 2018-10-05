var saveID = 0;

$(function () {

    //LoadLoanInfo();
    $('#btnSave').click(function () {
        if (Validate()) {
            var data1 = new Object();
            if ($('#txtId').val() == '') {
                data1.Id = -1;
            }
            else {
                data1.Id = $('#txtId').val();
            }
            data1.LoanInformation = $('#txtInformation').val();
            data1.Amount = $('#txtAmount').val();
            data1.ReferenceNo = $('#txtReferenceNo').val();
            data1.Interest = $('#txtInterest').val();
            data1.NetPayable = $('#txtNetPayable').val();

            $.blockUI({ message: '<h1><img src="../Resources/Images/busy.gif" /> Wait a moment...</h1>' });
            $.ajax({

                url: insertLoanInfo,
                type: 'POST',
                data: data1,
                success: function (data) {
                    var result = JSON.parse(data);
                    $(document).ajaxStop($.unblockUI);

                    if (result.statusCode == "401") {
                        //logOut();
                    }
                    else if (result.statusCode == "200") {
                        $('#txtId').val(result.id);
                        ClearAlfterSave();
                        toastr.options.timeOut = 3500;
                        toastr.success(result.statusMessage);
                        $("#btnSave").attr("disabled", true);

                        //LoadCompanyInfo();
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

function CalculateNetPayable()
{
    var amount = parseFloat($('#txtAmount').val());
    var interest = parseFloat($('#txtInterest').val());
    var netPayable = amount + ((amount / 100) * interest);

    $('#txtNetPayable').val(netPayable);
}
////////////////////////////////////////////////////////////

function Validate() {

    if (saveID == -1) {
        toastr.warning("Data already saved..");
        return false;
    }
    if ($('#txtInformation').val() == '') {
        toastr.options.timeOut = 3500;
        toastr.warning("Loan related information is required.", "Incomplete");
        return false;
    }
    if ($('#txtAmount').val() == -1) {
        toastr.options.timeOut = 3500;
        toastr.warning("Loan amount information is required.", "Incomplete");
        return false;
    }
    if ($('#txtInterest').val() == '') {
        toastr.options.timeOut = 3500;
        toastr.warning("Loan interest rate is required.", "Incomplete");
        return false;
    }
    if (parseInt($('#txtInterest').val()) > 100) {
        toastr.options.timeOut = 3500;
        toastr.warning("Loan interest rate must be less than 100.", "Incomplete");
        return false;
    }

    return true;
}

function ClearAlfterSave() {
    saveID = -1;
}

function ClearAll() {

    saveID = 0;

    $("#btnSave").removeAttr("disabled");
    $('#txtInformation').val('');
    $('#txtAmount').val('');
    $('#txtId').val('');
    $('#txtReferenceNo').val('');
    $('#txtInterest').val('');
    $('#txtNetPayable').val('');
}