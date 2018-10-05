


$(function () {

    var data1 = new Object();

    data1.fromDate = GetParameterValues('FromDate');
    data1.toDate = GetParameterValues('ToDate');
    data1.reportStatus = GetParameterValues('ReportStatus');

    $.blockUI({ message: '<h1><img src="../Resources/Images/busy.gif" /> Please wait a moment...</h1>' });

    $.ajax({
        url: reportView_HTML,
        type: 'POST',
        data: data1,
        success: function (data) {
            $(document).ajaxStop($.unblockUI);
            var list = JSON.parse(data);
            console.log(list);
            if (list.statusCode == '200') {
                //BindTable(list.ledgerListForView);
                $('.fieldsetTopMargin').html(list.report);
            }
            else {
                toastr.options.timeOut = 3500;
                toastr.warning(list.statusMessage);
            }
        },
        error: function (xhr) {
            $(document).ajaxStop($.unblockUI);
            toastr.options.timeOut = 3500;
            toastr.warning(xhr.status + ': ' + xhr.statusText);
        }
    })
})
