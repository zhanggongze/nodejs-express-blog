/**
 * API调试
 */
$(function () {

    var editId;
    ajaxSetup();
    list();


    if (sessionStorage.getItem("userName")) {
        $('#userInfor').find('a').text('当前登录用户:' + sessionStorage.getItem("userName"));
        $('#login').hide();
    } else {
        $('#userInfor').hide();
        $('#login').show();
    }

    $("#logout").click(function () {
        logout();
    });

    function logout() {
        $.ajax({
            type: 'post',
            url: './api/login/logout',
            success: function (res) {
                alert('退出成功')
                // location.reload();
                window.location.href = "./login";
            }
        })
    }

    $('#API button').click(function () {
        $('.tab').eq($(this).index()).show().siblings().hide();
    })

    $("#add").click(function () {

        var oData =JSON.stringify( {
            title: $('#title').val(),
            content: $("#content").val(),
            type: $("#articleType").val()
        });
        console.log(oData);
        $.ajax({
            type: 'post',
            url: './api/article/create',
            data: oData,
            success: function (res) {

                $('#title').val('')
                $("#content").val('')
                list();
                $('.tab').eq(1).hide();
                $('.tab').eq(0).show();
                // alert('文章创建成功！')
            }, error: function () {
                alert('文章创建失败，请登录后创建！')

            }
        })

        return false;
    });

    $('#all').click(function () {
        list()
    });

    $('#html').click(function () {
        listType('HTML');
    });

    $('#css').click(function () {
        listType('CSS');
    });

    $('#js').click(function () {
        listType('JavaScript');
    });
    $('#essay').click(function () {
        listType('essay');
    });

    $("#edit").click(function () {
        var oData =JSON.stringify( {
            title: $('#titleEdit').val(),
            content: $("#contentEdit").val(),

        });
        $.ajax({
            type: 'put',
            url: './api/article/update/' + editId,
            data: oData,
            success: function (res) {

                // $('#title').val('')
                // $("#content").val('')
                // $('.tab').eq(0).hide();
                // $('.tab').eq(1).show();

                list();

                $("#editModal").modal('hide');

                // alert('文章创建成功！')
            }
        })

        return false;
    });

    $("#listArticle").on('click', 'li', function () {
        editId = $(this).data("id");
        $.ajax({
            type: 'get',
            url: './api/article/findOne/' + $(this).data("id"),
            success: function (res) {

                $("#myModalLabel").text(res.title);
                $(".modal-body").text(res.content);

                $("#titleEdit").val(res.title);
                $("#contentEdit").text(res.content);

            }
        });

    });

    $("#listArticle").on('click', 'li .delete', function (event) {
        event.stopPropagation();
        console.log($(this).parent().parent().data("id"));
        $.ajax({
            type: 'delete',
            url: './api/article/delete/' + $(this).parent().parent().data("id"),
            success: function (res) {
                list();
                alert("删除成功");
            }
        });
    });

    function listType(type) {
        $.ajax({
            type: 'post',
            url: './api/article/listType',
            data: JSON.stringify({
                type: type,
                page: 1,
                rows: 2
            }),
            success: function (res) {
                res = res.items;
                var oHtml = '';
                for (var i = 0; i < res.length; i++) {
                    var element = res[i];
                    oHtml += '<li data-id="' + element._id + '" class="list-group-item">' + element.title + '<div style="float:right">' + transform(element.date, "yyyy-MM-dd hh:mm") + '&nbsp;&nbsp;<a style=" cursor: pointer;" data-toggle="modal" data-target="#myModal">查看文章</a>&nbsp;&nbsp;<a style=" cursor: pointer;" data-toggle="modal" data-target="#editModal">编辑文章</a>&nbsp;&nbsp;<a class="delete" style=" cursor: pointer;">删除文章</a></div></li>'

                }
                $('#listArticle').html(oHtml);
                // alert('文章创建成功！')
            }
        })
    }

    function list() {
        $.ajax({
            type: 'post',
            url: './api/article/list',
            data: JSON.stringify( {
                page: 1,
                rows: 6
            }),
            success: function (res) {




                console.log(res)
                res = res.items;
                var oHtml = '';
                for (var i = 0; i < res.length; i++) {
                    var element = res[i];
                    oHtml += '<li data-id="' + element._id + '" class="list-group-item">' + element.title + '<div style="float:right">' + transform(element.date, "yyyy-MM-dd hh:mm") + '&nbsp;&nbsp;<a style=" cursor: pointer;" data-toggle="modal" data-target="#myModal">查看文章</a>&nbsp;&nbsp;<a style=" cursor: pointer;" data-toggle="modal" data-target="#editModal">编辑文章</a>&nbsp;&nbsp;<a class="delete" style=" cursor: pointer;">删除文章</a></div></li>'

                }
                $('#listArticle').html(oHtml);



            }
        });
    }

    function transform(value, fmt) {

        value = new Date(value);

        let o = {
            "M+": value.getMonth() + 1, //月份 
            "d+": value.getDate(), //日 
            "h+": value.getHours(), //小时 
            "m+": value.getMinutes(), //分 
            "s+": value.getSeconds(), //秒 
            "q+": Math.floor((value.getMonth() + 3) / 3), //季度 
            "S": value.getMilliseconds() //毫秒 
        };

        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (value.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));

        return fmt;
    }

    //ajax 公共设置请求设置
    function ajaxSetup() {

        $.ajaxSetup({
            type: "POST", // 默认使用POST方式
            dataType: "json",
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem('token'),
                "Content-Type": "application/json;charset=UTF-8"
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


})