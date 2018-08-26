var pro = {
    hide: function (position) {
        if (position === 1)
        {
            $('#container_2').hide();
            contains = "container_" + position;
            $('#' + contains).toggle('slow');
        }
        if (position === 2) {
            $('#container_1').hide();
            contains = "container_" + position;
            $('#' + contains).toggle('slow');
        }

    },
    login_auth: function () {
        username = $("#username").val();
        password = $("#inputPassword").val();
        request_data = {'username': username, 'password': password};
        url = "/admin/adminLogin/login_auth";
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
                $("#error_text").text(data);
            } else {
                location.href = "/admin/main";
            }
            return false;
        });
    },
    click_page: function (to_page, url, request_data, func) {
        type = $("#page_contains").attr('type');
        now_page = $("#nowpage_" + type).val();
        if (now_page === to_page)
        {
            return false;
        }
        if (url === '' || url === undefined)
        {
            url = "/userAgent/userInfoApi";
        }
        if (request_data === "" || request_data === undefined)
        {
            request_data = {'page': to_page, 'type': type, 'limit': 20};
        }
        if (func === "" || func === undefined)
        {
            func = "click_page";
        }
        pro.page_turn(url, request_data, type, to_page, func);
    },
    page_turn: function (url, request_data, type, to_page, func = '') {
        $.post(url, request_data, function (data) {
            obj = $.parseJSON(data);
            html = obj.data.html;
            $('#container').html("");
            $('#container').html(html);
            count = obj.data.count;
            page_max = obj.data.page_max;
            if (count > 20)
            {
                $("#page_contains").html('');
                var page_html = '';
                var middle_page = parseInt(page_max / 2);
                var open_page = to_page + 3;
                if (open_page > page_max)
                {
                    open_page = page_max;
                }
                var prev_page = to_page - 3;
                if (prev_page < 0)
                {
                    prev_page = 1;
                }
                if (func === "" || func === undefined)
                {
                    func = "click_page";
                }
                for (var i = 1; i <= page_max; i++)
                {
                    if (i === 1 && i !== to_page && page_max >= 10)
                    {
                        page_html += '<li class="sub-header btn btn-lg btn-default" onclick="pro.' + func + '(1);">首页</li>';
                        continue;
                    }
                    if (i === to_page)
                    {
                        page_html += '<li class="sub-header btn btn-lg btn-success" onclick="pro.' + func + '(' + i + ');">' + i + '</li>';
                        continue;
                    }
                    if (i >= open_page && i < page_max && page_max >= 7)
                    {
                        if (i === open_page)
                        {
                            page_html += '<li class="sub-header btn btn-lg btn-default" onclick="pro.' + func + '(' + i + ')">...</li>';
                        }
                        continue;
                    }
                    if (i <= prev_page && i > 1 && page_max >= 7)
                    {
                        if (i === prev_page)
                        {
                            page_html += '<li class="sub-header btn btn-lg btn-default" onclick="pro.' + func + '(' + i + ')">...</li>';
                        }
                        continue;
                    }

                    if (i === page_max && i !== to_page && page_max >= 10)
                    {
                        page_html += '<li class="sub-header btn btn-lg btn-default" onclick="pro.' + func + '(' + page_max + ');">尾页</li>';
                        continue;
                    }
                    page_html += '<li class="sub-header btn btn-lg btn-default" onclick="pro.' + func + '(' + i + ');">' + i + '</li>';
                }
                page_html += "<span style='margin-left:10px;font-size:18px'>共" + count + "条数据,当前显示第" + to_page + "页</span>";
                $("#page_contains").html(page_html);
            } else {
                if (count !== 0)
                {
                    page_html = "<span style='margin-left:10px;font-size:18px'>共" + count + "条数据,当前显示第" + to_page + "页</span>";
                    $("#page_contains").html(page_html);
                }

            }
            $("#nowpage_" + type).val(to_page);
            $("#totalpage_" + type).val(page_max);
            return false;
        });
    },
    /**
     * 用户　代理商信息设置保存
     * @param {type} id
     * @returns {msg}
     */
    userinfo_save: function (id) {
        var fieldsVal = $("#u_type_" + id).val();
        //三级保证金比例
        var third_percent = $("#third_percent_" + id).val();
        //二级保证金比例
        var second_percent = $("#second_percent_" + id).val();
        //保证金
        var percentage = $('#percentage_' + id).val();
        //分销级别
        var member_level = $('#member_level_' + id).val();
        //一级佣金
        var first_commission = $('#first_commission_' + id).val();
        //二级佣金
        var seconds_commission = $('#seconds_commission_' + id).val();
        //三级佣金
        var thirds_commission = $('#thirds_commission_' + id).val();
        //提现设置
        var cash_limit = $('#cash_limit_' + id).val();
        //彩金比例设置
        var color_glod_commission = $('#color_glod_commission_' + id).val();
        //提现比例
        var cash_scale = $('#cash_scale_' + id).val();
        url = "/userAgent/edit";
        postData = {'id': id, 'u_type': fieldsVal, 'third_percent': third_percent, 'percentage': percentage, 'second_percent': second_percent, 'member_level': member_level,
            'first_commission': first_commission, 'seconds_commission': seconds_commission, 'thirds_commission': thirds_commission,
            'cash_limit': cash_limit, 'color_glod_commission': color_glod_commission, 'cash_scale': cash_scale
        };
        $.post(url, postData, function (data) {
            var obj = $.parseJSON(data);
            var msg = obj.msg;
            alert(msg);
        });
    },
    get_user_info: function (to_page)
    {
        $("#page_contains").html('');
        url = "/userAgent/userInfoApi";
        keywords = $('#userinfo_search').val();
        type = 1;
        if (keywords === "请输入手机号或者编号查询")
        {
            keywords = "";
        }
        search_type = $('#search').val();
        request_data = {'page': to_page, 'type': type, 'limit': 20, 'keywords': keywords, 'search_type': search_type};
        func = "get_user_info";
        pro.click_page(to_page, url, request_data, func);
    },
    userinfo_search: function () {
        $("#page_contains").html('');
        keywords = $('#userinfo_search').val();
        search_type = $('#search').val();
        url = "/userAgent/userInfoApi";
        if (keywords === "请输入手机号或者编号查询")
        {
            keywords = "";
        } else {
            if (search_type === undefined || search_type === "")
            {
                alert("请选择搜索方式");
                return false;
            }
        }

        to_page = 1;
        request_data = {'keywords': keywords, 'type': 2, 'search_type': search_type};
        func = "get_user_info";
        pro.click_page(to_page, url, request_data, func);
    },
    userinfo_edit: function (id) {
        if (id !== undefined || id !== "")
        {
            url = "/userAgent/userEdit?id=" + id;
            window.location.href = url;
        } else {
            return false;
        }
    },
    save: function (id) {
        var fieldsVal = $("#u_type_" + id).val();
        var third_percent = $("#third_percent_" + id).val();
        var second_percent = $("#second_percent_" + id).val();
        var percentage = $('#percentage_' + id).val();
        var member_level = $('#member_level_' + id).val();
        url = "/userAgent/edit";
        postData = {'id': id, 'u_type': fieldsVal, 'third_percent': third_percent, 'percentage': percentage, 'second_percent': second_percent, 'member_level': member_level}
        $.post(url, postData, function (data) {
            var obj = $.parseJSON(data);
            var msg = obj.msg;
            alert(msg);
        });
    },
    /**
     * 查看用户子用户
     * @param {type} id
     * @returns {undefined}
     */
    userinfo_view: function (id)
    {
        $("#page_contains").html('');
        url = "/userAgent/childApi";
        page = 1;
        var type = 1;
        request_data = {'id': id, 'limit': 20, 'type': type, 'page': page};
        $("#nowpage_" + type).val(page);
        $("#totalpage_" + type).val(page);
        $.post(url, request_data, function (data) {
            var obj = $.parseJSON(data);
            var msg = obj.status.msg;
            var code = obj.status.code;
            if (code === 0)
            {
                html = obj.data.html;
                $('#container').html("");
                $('#container').html(html);
            }
        });
    },

    /**
     * 登录用户编辑跳转页面
     * @param {type} id
     * @returns {Boolean}
     */
    manager_edit: function (id) {
        if (id !== undefined || id !== "")
        {
            url = "/admin/managerEdit?id=" + id;
            window.location.href = url;
        } else {
            return false;
        }
    },
    manager_add_save: function () {
        var loginName = $('#login_name').val();
        var realName = $('#real_name').val();
        var status = $('input[name=status]:checked').val();
        var email = $('#email').val();
        var password = $('#password').val();
        url = "/admin/managerAdd";
        postData = {'operation': 'add', 'login_name': loginName, 'real_name': realName, 'status': status, 'email': email, 'password': password};
        $.post(url, postData, function (data) {
            var obj = $.parseJSON(data);
            var msg = obj.msg;
            var code = obj.code;
            if (code === 0)
            {
                alert(msg);
                window.location.href = '/admin/list';
            } else {
                alert('更新失败');
            }

        });
    },
    /**
     * 登录账户保存
     * @param {type} id
     * @returns {undefined}
     */
    manager_save: function (id) {
        if (id === 1)
        {
            alert('管理员账户禁止修改');
            return false;
        }
        var loginName = $('#login_name_' + id).val();
        var realName = $('#real_name_' + id).val();
        var status = $('input[name=status]:checked').val();
        var email = $('#email_' + id).val();
        url = "/admin/managerEdit";
        postData = {'id': id, 'operation': 'edit', 'login_name': loginName, 'real_name': realName, 'status': status, 'email': email};
        $.post(url, postData, function (data) {
            var obj = $.parseJSON(data);
            var msg = obj.msg;
            var code = obj.code;
            if (code === 0)
            {
                alert(msg);
                window.location.href = '/admin/list';
            } else {
                alert('添加失败');
            }
        });
    },

    module_view: function (id)
    {
        postData = {'pid': id};
        url = "/api/module/list";
        $.post(url, postData, function (data)
        {
            var obj = $.parseJSON(data);
            var msg = obj.msg;
            var code = obj.code;
            if (code === 0)
            {
                html = obj.html;
                $('#container').html("");
                $('#container').html(html);
            }
        });
    },
    module_edit: function (id)
    {
        if (id !== undefined || id !== "")
        {
            url = "/module/edit?id=" + id;
            window.location.href = url;
        } else {
            return false;
        }
    },

    module_save: function (id)
    {
        var auth_name = $('#auth_name_' + id).val();
        var auth_url = $('#auth_url_' + id).val();
        var status = $('#status_' + id).val();
        var is_show = $('#is_show_' + id).val();
        var sort = $('#sort_' + id).val();
        var pid = $('#pid_' + id).val();
        var postData = {'id': id, 'auth_name': auth_name, 'auth_url': auth_url, 'status': status, 'is_show': is_show, 'type': 2, 'sort': sort, 'pid': pid};
        url = "/module/edit";
        $.post(url, postData, function (data) {
            var obj = $.parseJSON(data);
            var msg = obj.msg;
            var code = obj.code;
            if (code === 0)
            {
                alert("更新成功！");
                window.location.reload();
            } else {
                alert("更新失败！");
                window.location.reload();
            }
        });
    },

    module_add: function ()
    {
        var auth_name = $('#auth_name').val();
        var auth_url = $('#auth_url').val();
        var status = $('#status').val();
        var is_show = $('#is_show').val();
        var sort = $('#sort').val();
        var pid = $('#pid').val();
        var postData = {'auth_name': auth_name, 'auth_url': auth_url, 'status': status, 'is_show': is_show, 'type': 2, 'sort': sort, 'pid': pid};
        url = "/module/add";
        $.post(url, postData, function (data) {
            var obj = $.parseJSON(data);
            var msg = obj.msg;
            var code = obj.code;
            if (code === 0)
            {
                alert(msg);
                window.location.reload();
            } else {
                alert(msg);
                window.location.reload();
            }
        });
    },

    module_delete: function (id)
    {
        var msg = "您真的确定要删除吗？\n\n请确认！";
        if (confirm(msg) === true) {
            var postData = {'id': id};
            var url = "/module/delete";
            $.post(url, postData, function (data) {
                var obj = $.parseJSON(data);
                var msg = obj.msg;
                var code = obj.code;
                if (code === 0)
                {
                    alert(msg);
                } else {
                    alert(msg);
                }
            });
        } else {
            return false;
        }

    },
    userindex_show: function (id) {
        window.location.href = "/userindex/add?id=" + id;
    },

    show_second_invivation: function (to_page) {
        $("#page_contains").html('');
        var id = $('#get_id').val();
        var type = 1;
        $('#type_val').val(type);
        var url = "/userindex/childUserShow";
        var func = "show_second_invivation";
        var action = "topage";
        var request_data = {'id': id, 'limit': 20, 'type': type, 'page': to_page, 'action': action};
        pro.click_page(to_page, url, request_data, func);
    },
    show_third_invivation: function (to_page) {
        $("#page_contains").html('');
        var id = $('#get_id').val();
        var type = 2;
        $('#type_val').val(type);
        var url = "/userindex/childUserShow";
        var action = "topage";
        var func = "show_third_invivation";
        var request_data = {'id': id, 'limit': 20, 'type': type, 'page': to_page, 'action': action};
        pro.click_page(to_page, url, request_data, func);
    },

    get_child_user: function (id, type)
    {
        var action = "show";
        var page = 1;
        if (type === 1) {
            var type = 1;

            $('#type_val').val(type);

            window.location.href = "/userindex/childUserShow?id=" + id + "&type=" + type + "&page=" + page + "&action=" + action;
        }

        if (type === 2) {
            $('#type_val').val(type);
            window.location.href = "/userindex/childUserShow?id=" + id + "&type=" + type + "&page=" + page + "&action=" + action;
        }



    }
};

    