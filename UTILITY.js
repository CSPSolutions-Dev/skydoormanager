function InitialiazeGridToolTip(gridId) {

    $(gridId).kendoTooltip({
        filter: "th",
        content: function (e) {
            var target = e.target;
            return $(target).text();
        }
    });
}

var UTILITY = new function () {

    this.CloseKendoWindow = function (kendoWinName) {

        try {

            var win = null;

            try {

                if (window.parent != null) {
                    try {
                        win = window.parent.$("#" + kendoWinName).data("kendoWindow");
                    } catch (e) {

                    }
                }

                if (win == null) {
                    try {
                        win = $("#" + kendoWinName).data("kendoWindow");
                    } catch (e) {

                    }
                }

            } catch (e) {

            }

            if (win != null) {
                try {
                    win.close();
                } catch (e) {

                }

                try {
                    win.destroy();
                } catch (e) {

                }
            }
        } catch (e) {

        }
    }

    this.htmlEncode = function (value) {
        var encodedValue = $('<div />').text(value).html();
        return encodedValue;
    };

    this.GetQueryStringParameter = function (Key, url) { //incase we dont know the url, use 'url = window.location.href;'
        var result = url;

        if (!this.IsNullOrWhiteSpace(url)) {

            KeysValues = url.split(/[\?&]+/);

            for (i = 0; i < KeysValues.length; i++) {

                KeyValue = KeysValues[i].split("=");

                if (KeyValue[0] == Key) {

                    result = KeyValue[1];
                }
            }

            if (!this.IsNullOrWhiteSpace(result)) {
                result = result.replace("#", '');
            }
        }

        return result;
    };

    this.InitializeErrorLogging = function () {

        window.onerror = function (msg, url, line, col, error) {

            var extra = '';
            var errorSummary = '';

            try {

                if (col != null) {
                    extra = !col ? '' : '\ncolumn: ' + col;
                }

                if (error != null) {
                    extra += !error ? '' : '\nerror: ' + error;
                }

                errorSummary = "Error: " + msg + "\nurl: " + url + "\nline: " + line + extra;

                this.LogUIError(errorSummary);

            }
            catch (e) {

            }

            return false; //suppressErrorAlert
        };

    };

    this.LogUIError = function (error) {

        try {
            $.ajax({
                type: "POST",
                url: $("#hf_SiteUrl").val() + " LogUserUIError",
                data: { errorInfo: error },
                dataType: "json"
            });
        } catch (e) {

        }

    };

    this.IsCustomConsultViewModel = function (customConsultViewModel, typeId) {

        var success = false;

        try {

            if (customConsultViewModel != null) {

                var jsonObject = JSON.parse(customConsultViewModel);

                if (jsonObject != null) {
                    if (jsonObject.consultTypeId == typeId) {
                        success = true;
                    }
                }
            }

        } catch (e) {

        }

        return success;
    };

    this.GetJsonViewModelFieldValue = function (jsonViewModel, fieldName) {

        var result = '';

        try {

            if (jsonViewModel != null) {

                var jsonObject = JSON.parse(jsonViewModel);

                if (jsonObject != null) {

                    result = jsonObject[fieldName];
                }
            }

        } catch (e) {

        }

        return result;
    };

    this.IsNotSupportedBrowser = function () {

        var success = false;

        if ($("#hid_RequiresUpdating").val() == "1") {
            success = true;
        }

        return success;
    };

    this.IsSafari = function () {
        var success = false;

        try {

            var ua = navigator.userAgent.toLowerCase();

            if (ua.indexOf('safari') != -1) {
                if (ua.indexOf('chrome') > -1) {
                    success = false;
                } else {
                    success = true;
                }
            }

        } catch (e) {

        }

        return success;
    };

    this.ODataDefaultParameterMap = function (data, operation) {

        if (operation == "create" || operation == "update") {

            if (data.__kendo_devtools_id != undefined) {
                delete data.__kendo_devtools_id;
            }
            return JSON.stringify(data);
        }
        //Return default Odata settings
        return kendo.data.transports["odata"].parameterMap(data);
    };

    this.SelectDefaultTab = function (tabStripID, tabIndex) {

        setTimeout(function () {
            try {
                $("#" + tabStripID).kendoTabStrip().data("kendoTabStrip").select(tabIndex);
            } catch (e) {

            }
        }, 500);

    };

    this.GetDefaultCountryID = function () {
        var countryId = 3;

        try {

            var tempCountryId = $("#hid_DefaultCountryID").val();

            if ((tempCountryId == null) && (window.parent != null)) {
                tempCountryId = window.parent.$("#hid_DefaultCountryID").val();
            }

            if (!this.IsNullOrWhiteSpace(tempCountryId)) {
                countryId = parseInt(tempCountryId);
            }

        } catch (e) {

        }

        return countryId;
    };

    this.GetQueryString = function (Key, url) {

        KeysValues = url.split(/[\?&]+/);

        for (i = 0; i < KeysValues.length; i++) {

            KeyValue = KeysValues[i].split("=");

            if (KeyValue[0] == Key) {

                return KeyValue[1];
            }
        }

        return ""; //Not found
    };

    this.UploadConsultImage = function (uploadUrl, ls_key) {

        try {
            var ls_Sketch = sessionStorage.getItem(ls_key);

            if (ls_Sketch != null) {
                var url = "";

                $.ajax({
                    url: uploadUrl,
                    type: 'POST',
                    data: {
                        fileData: ls_Sketch,
                        type: 'base64'
                    },
                    success: function (success) {
                        if (success) {
                            sessionStorage.removeItem(ls_key);
                        }
                    },
                });

            }

        } catch (e) {

        }

    };

    this.SecurityAlertMsg = function () {

        try {

            console.log("%cStop!", "font: 2em sans-serif; color: yellow; background-color: red;");
            console.log("%cThis is a browser feature intended for developers", "font: 2em sans-serif; color: yellow; background-color: red;");
            console.log("%cCSP Healthcare security team will be alerted with all activity", "font: 2em sans-serif; color: yellow; background-color: red;");

        } catch (e) {

        }

    };

    this.EvaluateFunction = function (fnCallback) {
        try {
            if (fnCallback != null) {
                if ((typeof fnCallback) == "string") {

                    if (fnCallback.indexOf("(") == -1) {
                        var method = fnCallback + "()";
                        eval(method);
                    }
                    else {
                        eval(fnCallback);
                    }
                }
                else {
                    fnCallback();
                }
            }
        } catch (e) {

        }
    };

    this.GetPDFFileName = function (fileNameNoExtension) {

        return this.GetFileName(fileNameNoExtension, "pdf", null);
    };

    this.IsTrackNumber = function (str) {
        var success = false;

        if (str.indexOf("%") == 0) {
            success = true;
        }

        return success;
    };

    this.EscapeStringQuotes = function (str) {
        var result = str;

        if (!this.IsNullOrWhiteSpace(str)) {
            result = str.replace("'", "\\'");
            result = result.replace("\"", "\\\"");
        }

        return result;
    };

    this.EscapeODataStringQuotes = function (str) {
        var result = str;

        if (!this.IsNullOrWhiteSpace(str)) {
            result = str.replace("'", "''");
        }

        return result;
    };

    this.IsNullOrWhiteSpace = function (value) {
        var success = false;

        if ((value == null) || (value == '') || (value == "null")) {
            success = true;
        }
        else {

            if (value.trim().length == 0) {
                success = true;
            }
        }

        return success;
    };

    this.IsValidID = function (value) {
        var success = false;

        if (UTILITY.IsGuid(value) || UTILITY.IsInt(value)) {
            success = true;
        }

        return success;
    };

    this.IsInt = function (value) {
        var success = false;

        if (!UTILITY.IsNullOrWhiteSpace(value)) {
            success = (value % 1 === 0);
        }

        return success;
    };

    this.IsGuid = function (value) {
        var success = false;

        if (!UTILITY.IsNullOrWhiteSpace(value)) {

            var regex = /[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}/i;

            var match = regex.exec(value);

            success = (match != null);
        }

        return success;
    };

    this.EmptyGuid = function () {

        return '00000000-0000-0000-0000-000000000000';
    };

    this.IsClinicAdmin = function () {
        var success = false;
        var isCA = $("#hid_IsCA").val();

        if (isCA == undefined) {
            isCA = window.parent.$("#hid_IsCA").val();
        }

        if (isCA == "1") {

            success = true;
        }

        return success;
    };

    this.NormalizeKendoString = function (str) {
        var result = "";

        if (str != null) {
            result = str;
        }

        return result;
    };

    this.GetCInfo = function (str) {
        var cinfo = {
            track1: "", track2: ""
        };

        try {
            if (str.indexOf("%") == 0) {

                var tracks = str.split("?;");

                if (tracks.length > 0) {

                    cinfo.track1 = tracks[0].replace(/%/g, "");
                    var parts = cinfo.track1.split("@");

                    if (parts.length > 1) {

                        cinfo.track1 = parts[0].replace("?", "");
                        cinfo.track2 = parts[1].replace("?", "");
                    }
                }
            }
        } catch (e) {

        }

        return cinfo;
    };

    this.CreateAndDownloadPDFFile = function (selector, outputFileName, pdfSettings, loaderIconID, pdfButton) {

        kendo.drawing.drawDOM($(selector))
          .then(function (group) {
              group.options.set("pdf", pdfSettings);
              kendo.drawing.pdf.saveAs(group, outputFileName, null, function () {
                  try {
                      $("#" + loaderIconID).hide();
                      $(pdfButton).removeAttr("disabled");
                  }
                  catch (e) {
                  }
              });
          });
    };

    this.LogErrorInfo = function (errorText) {

        $.ajax({
            type: "POST",
            url: $("#hf_SiteUrl").val() + "LogUserUIError",
            data: { errorInfo: errorText },
            dataType: "json"
        });

    };

    this.LogError = function (e) {

        if (e != null) {

            if (e.message != null) {

                var errorMsg = e.message;

                $.ajax({
                    type: "POST",
                    url: $("#hf_SiteUrl").val() + "LogUserUIError",
                    data: { errorInfo: errorMsg },
                    dataType: "json"
                });

            }
        }

    };

    this.InitializeErrorSummaryWindow = function () {

        var window = $("#win_vsummary");

        if (!window.data("kendoWindow")) {
            window.kendoWindow({
                width: "450px",
                title: "Validation Summary",
                actions: [
                    "Close"
                ]
            });
        }
    }

    this.CloseSummaryWindow = function () {
        var window = $("#win_vsummary");
        window.data("kendoWindow").close();
    }

    this.ShowErrorSummaryWindow = function (errors) {

        if (errors != null) {
            var errorsContainer = $("#win_vsummary_content");

            var html = "<b>The following fields are required:<b>";

            html += "<br/><br/><ul>";

            for (var idx = 0; idx < errors.length; idx++) {
                html += "<li>" + errors[idx] + "</li>";
            }

            html += "</ul>";

            errorsContainer.empty().append($(html));

            var window = $("#win_vsummary");
            window.data("kendoWindow").center().open();
        }

    }

    this.GetExcelFileName = function (fileNameNoExtension) {

        return this.GetFileName(fileNameNoExtension, "xlsx", null);
    }

    this.ConstructFullName = function (first, middle, last) {
        var name = first + " ";

        if (middle != "" && middle != null) {
            name += middle + " ";
        }

        name += last;

        return name;
    }

    this.IframeResize = function (iframe) {

        var windowHeight = $(window).height();
        var recommendedHeight = 800;

        if (this.IsInt(iframe.height)) {
            var frameHeight = parseInt(iframe.height);

            if (frameHeight > 800) {
                recommendedHeight = frameHeight;
            }
        }

        if (windowHeight < recommendedHeight) {
            windowHeight = recommendedHeight;
        }
        else {
            windowHeight = windowHeight - 130;
        }

        var eheight = windowHeight;// + "px";

        //here you can make the height, I delete it first, then I make it again
        iframe.height = "";
        iframe.height = eheight; //(iframe.contentWindow.document.body.scrollHeight + 87) + "px";

        iframe.style.minHeight = eheight;
    }

    this.ResizeFrames = function () {

        try {

            var iFrames = $('iframe');

            for (var i = 0, j = iFrames.length; i < j; i++) {

                if ($(iFrames[i]).hasClass("EMR_tab")) {
                    this.IframeResize(iFrames[i]);
                }
            }

        } catch (e) {

        }
    }

    this.ScrollHomePage = function () {
        $("html, body").animate({
            scrollTop: 0
        }, 0);
    }

    this.PlayText = function (text) {

        if (text != null) {
            var audioUrl = $("#hid_TTSUrl").val();

            if (audioUrl != null && audioUrl != '') {

                audioUrl += text;

                this.PlayAudio(audioUrl);
            }
        }
    }

    this.PlayAudio = function (audioUrl) {
        var audioUrl;

        var my_jPlayer = $("#jquery_jplayer");

        my_jPlayer.jPlayer({
            swfPath: "../jplayer",
            supplied: "mp3",
            wmode: "window"
        });

        my_jPlayer.jPlayer("setMedia", {
            mp3: audioUrl
        });

        my_jPlayer.jPlayer("play");
    }

    this.GetFileName = function (fileNameNoExtension, extension, version) {

        try {

            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!
            var yyyy = today.getFullYear();

            if (dd < 10) {
                dd = '0' + dd
            }

            if (mm < 10) {
                mm = '0' + mm
            }

            today = dd + '-' + mm + '-' + yyyy;

        } catch (e) {

            today = "New";

        }

        var fileName = "";

        if (version != null) {

            fileName = fileNameNoExtension + " - " + version + " [ " + today + " ]." + extension;
        }
        else {
            fileName = fileNameNoExtension + " [ " + today + " ]." + extension;
        }

        return fileName;
    }

    this.CalculateAge = function (birthday) {

        if ((birthday == null) || (birthday == "")) {
            return "";
        }

        var ageDifMs = Date.now() - birthday.getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    };

    this.CombineUrl = function (baseUrl, page) {
        var result = baseUrl, pageName = page;

        if (baseUrl[baseUrl.length - 1] != "/") {
            result = baseUrl + "/";
        }

        if (page[0] == "/") {
            pageName = page.substring(1, page.length);
        }

        result = result + pageName;

        return result;
    };

    this.ReloadKendoGrid = function (gridName) {
        $("#" + gridName).data("kendoGrid").dataSource.read();
    };

    this.ResolveUrl = function (page) {
        var result = "", baseUrl = $("#hid_BaseUrl").val();

        result = this.CombineUrl(baseUrl, page);

        return result;
    };

    this.ResolveSiteUrl = function (page) {
        var result = "", baseUrl = $("#hf_SiteUrl").val();

        result = this.CombineUrl(baseUrl, page);

        return result;
    };

    this.isNullOrWhitespace = function (input) {

        if (input == null) return true;

        return input.replace(/\s/g, '').length < 1;
    };

    this.OpenUrl = function (url) {

        $("#a_loadLink").attr("href", url);
        $("#a_loadLink").click();

    };

    this.ResolveOdataUrl = function (page) {
        var result = "", baseUrl = $("#hf_SiteUrl").val() + "/odata";

        result = this.CombineUrl(baseUrl, page);

        return result;
    };

    this.StandardTruncate = function (text) {
        var result = text;

        if (text.length > 220) {
            result = text.substring(0, 220) + "...";
        }

        return result;
    };

    this.DestroyKendoGrid = function (gridName) {

        try {

            $('#' + gridName).data().kendoGrid.destroy();
            $('#' + gridName).empty();

        } catch (e) {

        }
    };

    this.TruncateDataViewText = function (dataView, columns) {

        var columnName = "";


        for (var i = 0; i < dataView.length; i++) {

            for (var j = 0; j < columns.length; j++) {

                columnName = columns[i];

                dataView[i][columnName] = UTILITY.StandardTruncate(dataView[i][columnName]);
            }
        }

    };

    this.ResetComboBoxIfNoItemSelected = function (e) {
        try {
            if (e.sender.value != null) {

                if (e.sender.value() && e.sender.selectedIndex == -1) {//reset the combo if no item selected from list  
                    e.sender.value(null);
                    e.sender.trigger("change");
                }
            }
        } catch (e) {

        }

    };

    this.ReplaceAll = function (targetString, search, replacement) {

        return targetString.split(search).join(replacement);
    };

    this.GetOSName = function () {
        var OSName = "Unknown OS";

        if (navigator.appVersion.indexOf("Win") != -1) OSName = "Windows";
        else if (navigator.appVersion.indexOf("Mac") != -1) OSName = "MacOS";
        else if (navigator.appVersion.indexOf("X11") != -1) OSName = "UNIX";
        else if (navigator.appVersion.indexOf("Linux") != -1) OSName = "Linux";

        return OSName;
    }

    this.ConvertJsonToDate = function (jsonDate) {
        var resultDate = '';

        if (jsonDate != null) {

            var milli = jsonDate.replace(/\/Date\((-?\d+)\)\//, '$1');

            resultDate = new Date(parseInt(milli));
        }

        return resultDate;
    };

    this.NormilizeDateFormat = function (date) {
        var resultDate = date;

        try {
            if (date != null) {

                resultDate = kendo.toString(kendo.parseDate(date, "yyyy/MM/dd"), "d");

                if (resultDate == null) {
                    resultDate = date;
                }
            }
        }
        catch (e) {
            resultDate = date;
        }

        return resultDate;
    };

    this.AjaxFormErrorHandler = function (e) {

        try {
            var resources = null;

            if (window.parent == undefined) {
                resources = RESOURCES_DICTIONARY;
            }
            else {
                resources = window.parent.RESOURCES_DICTIONARY;
            }

            var msg = resources.GetResource("GeneralError");

            if ((msg != "") && (msg != null)) {
                if (window.parent == undefined) {
                    InitializeErrorPopupWindow(msg);
                }
                else {
                    window.parent.InitializeErrorPopupWindow(msg);
                }
            }

        } catch (e) {

        }
    };

    this.GridErrorHandler = function (e) {

        var resources;

        if (window.parent == undefined) {
            resources = RESOURCES_DICTIONARY;
        }
        else {
            resources = window.parent.RESOURCES_DICTIONARY;
        }

        var msg = "";

        var statusCode = e.xhr.status; //error status code

        if (statusCode == 405) {
            msg = resources.GetResource("405Error");
        }
        else if (statusCode == 409) {
            msg = resources.GetResource("409Error");
        }
        else if (statusCode == 417) {
            msg = resources.GetResource("417Error");
        }
        else {
            msg = resources.GetResource("GeneralError");
        }

        if ((msg != "") && (msg != null)) {
            if (window.parent == undefined) {
                InitializeErrorPopupWindow(msg);
            }
            else {
                window.parent.InitializeErrorPopupWindow(msg);
            }

            $(".k-grid").each(function () {
                var grid = $(this).data("kendoGrid");
                if (grid !== null && grid.dataSource == e.sender) {
                    grid.cancelChanges();
                }
            });

        }
    };

    this.CapitalizeWords = function (words) {
        var result = words;

        try {
            if (!this.IsNullOrWhiteSpace(words)) {

                var splitStr = words.toLowerCase().split(' ');

                for (var i = 0; i < splitStr.length; i++) {
                    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
                }

                result = splitStr.join(' ');
            }
        } catch (e) {

        }

        return result;
    }

    this.CapitalizeFirstLetter = function (value) {
        var result = value;

        try {
            if (value != null) {
                if (value.length > 1) {
                    result = value.charAt(0).toUpperCase() + value.slice(1);
                }
            }
        } catch (e) {

        }

        return result;
    }

    this.ConfirmGridDelete = function (e, gridName, msg, top) {


        try {

            var winDivID = "confirmWindow_" + gridName;

            var winHtml = '<div id="' + winDivID + '" style="display:none;" >'
                + '<p style="padding: 20px;"> ' + msg + '</p>'
                + '<div style="float:right;padding: 10px 10px;"><button id="btnYes" class="k-button k-primary" type="button" ><i class="k-icon k-update"></i> Yes</button> '
                + '<button id="btnNo" class="k-button k-cancel" type="button" ><i class="k-icon k-cancel"></i> No</button></div>' +
                '</div>';

            $(winHtml).appendTo(document.body);

            var gwdiv = $('#' + winDivID);

            if (gwdiv != null) {

                gwdiv.data('row', e.parents('tr:first'));
                gwdiv.data('gridID', gridName);

                this.InitializeDeleteWindow(winDivID);

                var wnd = gwdiv.data("kendoWindow");

                if (wnd != null) {

                    if (top != null) {
                        wnd.center().open().element.closest(".k-window").css({
                            top: top
                        });
                    }
                    else {
                        wnd.center().open();
                    }

                    this.InitializeDeleteWindowEvents(winDivID);
                }
            }

        } catch (e) {

        }



    };

    this.InitializeDeleteWindowEvents = function (winDivID) {
        var gwdiv = $('#' + winDivID);

        gwdiv.find('#btnNo').click(function () {

            var wdiv = $('#' + winDivID);

            wdiv.kendoWindow('destroy');

        });

        gwdiv.find('#btnYes').click(function () {

            var wdiv = $('#' + winDivID);

            try {

                var gridIDName = wdiv.data('gridID');

                var grid = $("#" + gridIDName).data('kendoGrid');

                grid.removeRow(wdiv.data('row')[0]);

                wdiv.kendoWindow('destroy');

            } catch (e) {

            }
        });
    }

    this.InitializeDeleteWindow = function (winDivID) {
        $('#' + winDivID).kendoWindow({
            modal: true,
            width: 400,
            // height: 132,
            resizable: false,
            animation: {
                open: false
            },
            visible: false,
            title: "Confirmation",
            pinned: true,
            close: function () {
                setTimeout(function () {
                    $('#' + winDivID).kendoWindow('destroy');
                }, 50);
            }
        });

    }

    this.NormalizeKendoObject = function (data) {
        for (var property in data) {
            if ($.isArray(data[property])) {
                this.SerializeArray(property, data[property], data);
            }
        }
    };

    this.SerializeArray = function (prefix, array, result) {
        for (var i = 0; i < array.length; i++) {
            if ($.isPlainObject(array[i])) {
                for (var property in array[i]) {
                    result[prefix + "[" + i + "]." + property] = array[i][property];
                }
            }
            else {
                result[prefix + "[" + i + "]"] = array[i];
            }
        }
    }

    this.InitializeLayoutToolTips = function (position) {
        if (UTILITY.CheckDeviceIfMobile()) {
            return;
        }
        var timeOut = 500;

        var checkIfHasTitleValue = function (filter) {

            if (filter.is("[title]") && filter.attr("title") != "" && filter.data("role") != "tooltip") {
                return true;
            }
            else return false;
        }

        $("a").filter(function () { return checkIfHasTitleValue($(this)) }).kendoTooltip({
            position: position,
            showAfter: timeOut
        });

        $("i").filter(function () { return checkIfHasTitleValue($(this)) }).kendoTooltip({
            position: position,
            showAfter: timeOut
        });

        $("span").filter(function () { return checkIfHasTitleValue($(this)) }).kendoTooltip({
            position: position,
            showAfter: timeOut
        });

        $("button").filter(function () { return checkIfHasTitleValue($(this)) }).kendoTooltip({
            position: position,
            showAfter: timeOut
        });

        $("img").filter(function () { return checkIfHasTitleValue($(this)) }).kendoTooltip({
            position: position,
            showAfter: timeOut
        });
    }

    this.CheckDeviceIfMobile = function () {
        var isMobile = false; //initiate as false
        // device detection
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
            || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) isMobile = true;

        return isMobile;
    }
}

var CookiesHandler = new function () {
    this.GetCookie = function (name) {
        //get the value of 'name' from cookies
        var name = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i].trim();
            if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
        }
        return "";
    };
    this.SetCookie = function (name, value, nbDays) {
        //set new cookie of name 'name', value 'value',and the number of days until the cookie should expire (nbDays).
        var d = new Date();
        d.setTime(d.getTime() + (nbDays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toGMTString();
        document.cookie = name + "=" + value + "; " + expires;
    };
    this.CheckCookie = function (name) {
        //check if a cookie name already exist
        var name = this.GetCookie(name);
        if (name != "") { return true; }
        else { return false; }
    };
}



