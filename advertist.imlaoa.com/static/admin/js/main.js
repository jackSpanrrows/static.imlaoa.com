/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var pro =
        {
            login_auth: function ()
            {
                username = $("#username").val();
                password = $("#inputPassword").val();
                request_data = {'username': username, 'password': password};
                url = "/login/loginauth";
                if (username === "" || username === undefined)
                {
                    $("#error_text").text("用户名不能为空");
                    return false;
                }
                if (password === "" || password === undefined)
                {
                    $("#error_text").text("密码不能为空");
                    return false;
                }
                $.post(url, request_data, function (data) {
                    if (data)
                    {
                        obj = $.parseJSON(data);
                        msg = obj.msg;
                        $("#error_text").text(msg);
                    } else {
                        location.href = "/admin/main";
                    }
                    return false;
                });
            },
            showCaptcha: function (captcha)
            {
                if (captcha === "" || captcha === undefined || captcha.typeof() === "undefined")
                {
                    $("#authCaptcha").html("验证码不能为空");
                    return false;
                }
            },
            admin_user_add: function ()
            {
                var admin_account = $('#admin_account').val();
                var user_name = $('#user_name').val();
                var admin_status = $('input[name=status]:checked').val();
                var admin_passwd = $('#admin_passwd').val();
                url = "/admin-user/save";
                var token = $('#token').val();
                var type = 1;
                var action = 'add';
                postData = {'action': action, 'admin_account': admin_account, 'user_name': user_name, 'admin_status': admin_status, 'admin_passwd': admin_passwd, 'token': token, 'type': type};
                $.post(url, postData, function (data) {
                    var obj = $.parseJSON(data);
                    var msg = obj.msg;
                    var code = obj.code;
                    if (code === 0)
                    {
                        alert(msg);
                        window.location.href = '/admin-user/list';
                    } else {
                        alert(msg);
                    }

                });
            },
            admin_user_update: function (id)
            {
                var admin_status = $("#admin_status option:selected").val();
                var action = "update";
                var type = 2;
                var url = "/admin-user/update";
                var postData = {'admin_status': admin_status, 'action': action, 'type': type, 'id': id};
                $.post(url, postData, function (data) {
                    var obj = $.parseJSON(data);
                    var msg = obj.msg;
                    var code = obj.code;
                    if (code === 0)
                    {
                        alert(msg);
                        window.location.href = '/admin-user/list';
                    } else {
                        alert(msg);
                    }
                });
            },

            admin_role_add: function ()
            {
                var action = "add";
                var group_name = $("#group_name").val();
                var flag = $("input[name=flag]:checked").val();
                var url = "/admin-role/save";
                var postData = {'action': action, 'group_name': group_name, 'flag': flag};
                $.post(url, postData, function (data) {
                    var obj = $.parseJSON(data);
                    var msg = obj.msg;
                    var code = obj.code;
                    if (code === 0)
                    {
                        alert(msg);
                        window.location.href = '/admin-role/index';
                    } else {
                        alert(msg);
                    }
                });
            },
            admin_role_update: function (id)
            {
                window.location.href = '/admin-role/edit?group_id=' + id;
            },

            admin_role_delete: function (id) {
                var url = "/admin-role/delete";
                var postData = {'id': id};
                $.post(url, postData, function (data) {
                    var obj = $.parseJSON(data);
                    var msg = obj.msg;
                    var code = obj.code;
                    if (code === 0) {
                        alert("删除成功!");
                        window.location.reload();
                    } else {
                        alert(msg);
                    }
                });
            },
            template_add_controller: function (type) {
                if (type === undefined || typeof (type) === "undefined" || type === "") {
                    var type = 0;
                }
                var controller_id = $("#controller_id").val();
                var namespace = $("#namespace").val();
                var base_class = $("#base_class").val();
                var code_template = $("#code_template").val();
                var actions = $("#actions").val();
                var description = $("#description").val();
                var url = "/template/generator-controller";
                var postData = {'controller_id': controller_id, 'namespace': namespace, 'base_class': base_class, 'code_template': code_template, 'actions': actions, 'description': description, 'type': type};
                $.post(url, postData, function (data) {
                    var obj = $.parseJSON(data);
                    var msg = obj.msg;
                    var code = obj.code;
                    var content = obj.data.overwrite;
                    console.log(content);
                    console.log(msg);
                    if (code === 0) {
                        $('#generator_text').val(msg);
                        return false;
                    }
                    if (content === 1) {
                        $('#generator_text').val(msg);
                        $("#model_overwrite").css('display', 'none');
                        $("#controller_overwrite").css('display', 'block');
                        return false;
                    }
                    if (code === -1){
                        alert(msg);
                        return false;
                    }


                });
            },
            template_add_model: function (type) {
                if (type === undefined || typeof (type) === "undefined" || type === "") {
                    var type = 0;
                }
                var model_id = $("#model_id").val();
                var namespace = $("#model_namespace").val();
                var base_class = $("#model_base_class").val();
                var code_template = $("#model_code_template").val();
                var model_database = $("#model_database").val();
                var description = $("#model_description").val();
                var url = "/template/generator-model";
                var postData = {'model_id': model_id, 'namespace': namespace, 'base_class': base_class, 'code_template': code_template, 'model_database': model_database, 'description': description, 'type': type};
                $.post(url, postData, function (data) {
                    var obj = $.parseJSON(data);
                    var msg = obj.msg;
                    var code = obj.code;
                    var content = obj.data.overwrite;
                    console.log(content);
                    console.log(msg);
                    if (code === 0) {
                        $('#generator_text').val(msg);
                        return false;
                    }
                    if (content === 1) {
                        $('#generator_text').val(msg);
                        $("#controller_overwrite").css('display', 'none');
                        $("#model_overwrite").css('display', 'block');
                        return false;
                    }
                    if (code === -1){
                        alert(msg);
                        return false;
                    }
                });
            },
            
            clear_textarea: function () {
                $('#generator_text').val('');
            }

        };

