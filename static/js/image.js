/**
 * zhanggongze 
 */
$(function () {

    //获取上传token
    ajaxSetup();
    token();

    //七牛表单上传图片
    qiniuUpimg()

    //tab切换
    tab();

    loadImg();

    loadImgType();

    imgView()


    $("#logout").click(function () {
        logout();
    });

    function logout() {
        $.ajax({
            type: 'post',
            url: './api/login/logout',
            success: function (res) {
                alert('退出成功')
                location.reload();
            }
        })
    }


    function token() {
        $.ajax({
            url: './api/image/uptoken',
            type: 'get',
            success: function (res) {
                $("#token").val(res.uptoken);
                // console.log(res);
            }
        });
    };

    function qiniuUpimg() {

        var domain = 'http://image.zhanggongze.com/';

        var $key = $('#key');  // file name    eg: the file is image.jpg,but $key='a.jpg', you will upload the file named 'a.jpg'
        var $userfile = $('#userfile');  // the file you selected
        var $selectedFile = $('.selected-file');
        var $progress = $(".upprogress");
        var $uploadedResult = $('.uploaded-result');

        $("#userfile").change(function () {  // you can ues 'onchange' here to uplpad automatically after select a file

            $uploadedResult.html('');
            var selectedFile = $userfile.val();
            if (selectedFile) {
                // randomly generate the final file name
                var ramdomName = Math.random().toString(36).substr(2) + $userfile.val().match(/\.?[^.\/]+$/);

                console.log(ramdomName);
                $key.val(ramdomName);
                $selectedFile.html('文件：' + selectedFile);
            } else {
                return false;
            }


            var f = new FormData(document.getElementById("testform"));

            $.ajax({
                url: 'http://upload.qiniu.com/',  // Different bucket zone has different upload url, you can get right url by the browser error massage when uploading a file with wrong upload url.
                type: 'POST',
                data: f,
                processData: false,
                contentType: false,
                xhr: function () {

                    myXhr = $.ajaxSettings.xhr();

                    if (myXhr.upload) {
                        myXhr.upload.addEventListener('progress', function (e) {
                            // console.log(e);
                            if (e.lengthComputable) {
                                var percent = e.loaded / e.total * 100;
                                $progress.html('上传：' + e.loaded + "/" + e.total + " bytes. " + percent.toFixed(2) + "%");
                            }
                        }, false);
                    }

                    return myXhr;

                },
                success: function (res) {

                    //   console.log("成功：" + JSON.stringify(res));
                    var str = '<span>已上传：' + res.key + '</span>';
                    var imgsrc = domain + res.key;
                    // if (res.key && res.key.match(/\.(jpg|jpeg|png|gif)$/)) {
                    str += '<img width="100%" src="' + imgsrc + '"/>';
                    // }
                    $uploadedResult.html(str);

                    createImg(imgsrc, $("#articleType").val());

                },
                error: function (res) {

                    //   console.log("失败:" + JSON.stringify(res));
                    $uploadedResult.html('上传失败：' + res.responseText);

                }
            });


            return false;


        });



    }

    function tab() {
        $('#API button').click(function () {
            $('.tab').eq($(this).index()).show().siblings().hide();
        });
    }

    function createImg(imgsrc, type) {

        var oData = {
            src: imgsrc,
            type: type
        }

        $.ajax({
            type: 'post',
            url: './api/image/create',
            data: oData,
            success: function (res) {
                // console.log(res);
                loadImg();
            }, error: function (params) {
                alert('图片上传失败，请登录后上传！')
            }
        });

        return false;
    }

    function loadImg() {
        $.ajax({
            url: './api/image/list',
            type: 'post',

            success: function (res) {

                if (res['userName']) {
                    $('#userInfor').find('a').text('当前登录用户:' + res['userName']);
                    $('#login').hide();
                } else {
                    $('#userInfor').hide();
                    $('#login').show();
                }

                // $("#token").val(res.uptoken);
                res = res.items;
                // console.log(res);
                var oHtml = '';
                for (var i = 0; i < res.length; i++) {
                    oHtml += ' <li data-toggle="modal" data-target="#editModal" data-id="' + res[i]._id + '"><img src="' + res[i].src + '?imageView2/2/h/200" alt=""></li>'
                };

                $("#listArticle").html(oHtml);

            }
        });
    }

    function loadImgType() {

        $(".imgType").click(function () {

            if ($(this).index() == 1) {
                loadImg();
                return false;
            }

            var type = $(this).data("type");
            $.ajax({
                url: './api/image/listType',
                type: 'post',
                data: {
                    page: 1,
                    rows: 2,
                    type: type
                },
                success: function (res) {
                    // $("#token").val(res.uptoken);
                    res = res.items;
                    //   console.log(res);
                    var oHtml = '';
                    for (var i = 0; i < res.length; i++) {
                        oHtml += ' <li data-toggle="modal" data-target="#editModal" data-id="' + res[i]._id + '"><img src="' + res[i].src + '" alt=""></li>'
                    };

                    $("#listArticle").html(oHtml);

                }
            });
        });

    }

    function imgView() {
        $('#listArticle').on('click', 'li', function () {

            var imgId = $(this).data("id");

            $("#deletimg").data('id', imgId);

            $.ajax({
                url: './api/image/findOne/' + imgId,
                type: 'get',
                success: function (res) {
                    // $("#token").val(res.uptoken);
                    //   console.log(res);

                    $("#modalImg").attr('src', res.src);

                }
            });
        });
    }

    $('#deletimg').click(function () {
        deletImg($("#deletimg").data('id'))
    });

    function deletImg(id) {
        $.ajax({
            url: './api/image/delete/' + id,
            type: 'delete',
            success: function (res) {
                alert('删除成功！');
                location.reload();
            }
        });

    };


    //ajax 公共设置请求设置
    function ajaxSetup() {

        $.ajaxSetup({
            type: "POST", // 默认使用POST方式
            headers: { 
                "Authorization": "Bearer " + sessionStorage.getItem('token'),
                "ContentType":"application/json;charset=UTF-8"
             },
            error: function (jqXHR, textStatus, errorMsg) { // 出错时默认的处理函数
                // jqXHR 是经过jQuery封装的XMLHttpRequest对象
                // textStatus 可能为： null、"timeout"、"error"、"abort"或"parsererror"
                // errorMsg 可能为： "Not Found"、"Internal Server Error"等

                // 提示形如：发送AJAX请求到"/index.html"时出错[404]：Not Found

                alert('发送AJAX请求到"' + this.url + '"时出错[' + jqXHR.status + ']：' + errorMsg);
            }
        });
    }



});