/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const pro =
    {
        login_auth: function () {
            username = $("#username").val();
            password = $("#inputPassword").val();
            request_data = {'username': username, 'password': password};
            url = "/login/loginauth";
            if (username === "" || username === undefined) {
                $("#error_text").text("用户名不能为空");
                return false;
            }
            if (password === "" || password === undefined) {
                $("#error_text").text("密码不能为空");
                return false;
            }
            $.post(url, request_data, function (data) {
                if (data) {
                    obj = $.parseJSON(data);
                    msg = obj.msg;
                    $("#error_text").text(msg);
                } else {
                    location.href = "/admin/main";
                }
                return false;
            });
        },

        click_page: function (to_page, url, request_data, func) {
            type = $("#page_contains").attr('type');
            now_page = $("#nowpage_" + type).val();
            if (now_page === to_page) {
                return false;
            }
            if (url === '' || url === undefined) {
                url = "/userAgent/userInfoApi";
            }
            if (request_data === "" || request_data === undefined) {
                request_data = {'page': to_page, 'type': type, 'limit': 20};
            }
            if (func === "" || func === undefined) {
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
                if (count === undefined || count === "") {
                    var count = 0;
                }
                page_max = obj.data.page_max;
                if (count > 20) {
                    $("#page_contains").html('');
                    var page_html = '';
                    var middle_page = parseInt(page_max / 2);
                    var open_page = to_page + 3;
                    if (open_page > page_max) {
                        open_page = page_max;
                    }
                    var prev_page = to_page - 3;
                    if (prev_page < 0) {
                        prev_page = 1;
                    }
                    if (func === "" || func === undefined) {
                        func = "click_page";
                    }
                    for (var i = 1; i <= page_max; i++) {
                        if (i === 1 && i !== to_page && page_max >= 10) {
                            page_html += '<li class="sub-header btn btn-lg btn-default" onclick="pro.' + func + '(1);">首页</li>';
                            continue;
                        }
                        if (i === to_page) {
                            page_html += '<li class="sub-header btn btn-lg btn-success" onclick="pro.' + func + '(' + i + ');">' + i + '</li>';
                            continue;
                        }
                        if (i >= open_page && i < page_max && page_max >= 7) {
                            if (i === open_page) {
                                page_html += '<li class="sub-header btn btn-lg btn-default" onclick="pro.' + func + '(' + i + ')">...</li>';
                            }
                            continue;
                        }
                        if (i <= prev_page && i > 1 && page_max >= 7) {
                            if (i === prev_page) {
                                page_html += '<li class="sub-header btn btn-lg btn-default" onclick="pro.' + func + '(' + i + ')">...</li>';
                            }
                            continue;
                        }

                        if (i === page_max && i !== to_page && page_max >= 10) {
                            page_html += '<li class="sub-header btn btn-lg btn-default" onclick="pro.' + func + '(' + page_max + ');">尾页</li>';
                            continue;
                        }
                        page_html += '<li class="sub-header btn btn-lg btn-default" onclick="pro.' + func + '(' + i + ');">' + i + '</li>';
                    }
                    page_html += "<span style='margin-left:10px;font-size:18px'>共" + count + "条数据,当前显示第" + to_page + "页</span>";
                    $("#page_contains").html(page_html);
                } else {
                    if (count !== 0) {
                        page_html = "";
                        $("#page_contains").html(page_html);
                    } else {
                        page_html = "";
                        $("#page_contains").html(page_html);
                    }

                }
                $("#nowpage_" + type).val(to_page);
                $("#totalpage_" + type).val(page_max);
                return false;
            });
        },

        showCaptcha: function (captcha) {
            if (captcha === "" || captcha === undefined || captcha.typeof() === "undefined") {
                $("#authCaptcha").html("验证码不能为空");
                return false;
            }
        },

        admin_user_add: function () {
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
                if (code === 0) {
                    alert(msg);
                    window.location.href = '/admin-user/list';
                } else {
                    alert(msg);
                }

            });
        },

        admin_user_update: function (id) {
            var admin_status = $("#admin_status option:selected").val();
            var action = "update";
            var type = 2;
            var url = "/admin-user/update";
            var postData = {'admin_status': admin_status, 'action': action, 'type': type, 'id': id};
            $.post(url, postData, function (data) {
                var obj = $.parseJSON(data);
                var msg = obj.msg;
                var code = obj.code;
                if (code === 0) {
                    alert(msg);
                    window.location.href = '/admin-user/list';
                } else {
                    alert(msg);
                }
            });
        },

        admin_role_add: function () {
            var action = "add";
            var group_name = $("#group_name").val();
            var flag = $("input[name=flag]:checked").val();
            var url = "/admin-role/save";
            var postData = {'action': action, 'group_name': group_name, 'flag': flag};
            $.post(url, postData, function (data) {
                var obj = $.parseJSON(data);
                var msg = obj.msg;
                var code = obj.code;
                if (code === 0) {
                    alert(msg);
                    window.location.href = '/admin-role/index';
                } else {
                    alert(msg);
                }
            });
        },

        admin_role_update: function (id) {
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
                if (code === -1) {
                    alert(msg);
                    return false;
                }


            });
        },

        template_add_model: function (type) {
            if (type === undefined || typeof (type) === "undefined" || type === "") {
                type = 0;
            }
            var model_id = $("#model_id").val();
            var namespace = $("#model_namespace").val();
            var base_class = $("#model_base_class").val();
            var code_template = $("#model_code_template").val();
            var model_database = $("#model_database option:selected").val();
            var description = $("#model_description").val();
            var model_table = $("#model_tables").val();
            var url = "/template/generator-model";
            var postData = {'model_id': model_id, 'namespace': namespace, 'base_class': base_class, 'code_template': code_template, 'model_database': model_database, 'description': description, 'type': type, 'model_table': model_table};
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
                if (code === -1) {
                    alert(msg);
                    return false;
                }
            });
        },
        template_add_view: function (type) {
            if (type === undefined || typeof (type) === "undefined" || type === "") {
                type = 0;
            }
            var view_id = $("#view_id").val();
            var controller_view = $("#controller_view").val();
            var view_description = $("#view_description").val();
            var view_code_template = $("#view_code_template").val();
            var view_table = $("#view_table").val();
            var model_id = $("#view_model_id").val();
            var url = "/template/generator-view";
            var view_func = $("#view_func").val();
            var view_database = $("#view_database").val();
            var postData = {'view_id': view_id, 'controller_view': controller_view, 'view_description': view_description, 'code_template': view_code_template, 'view_table': view_table, 'model_id': model_id, 'type': type, 'view_func': view_func, 'view_database': view_database};
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
                    $("#model_overwrite").css('display', 'none');
                    $("#view_overwrite").css('display', 'block');
                    return false;
                }
                if (code === -1) {
                    alert(msg);
                    return false;
                }
            });

        },

        clear_textarea: function () {
            $('#generator_text').val('');
        },

        show_position_category: function (to_page) {
            $("#page_contains").html('');
            var url = "/position-category/api-show";
            var func = "show_position_category";
            var request_data = {'limit': 20, 'page': to_page};
            pro.click_page(to_page, url, request_data, func);
        },

        position_category_info: function () {
            window.location.href = "/position-category/category-info";
        },

        position_search: function () {
            var keywords = $('#position_search').val();
            var search_type = $("#selected_keywords").val();
            if (position_search === "") {
                alert("请输入搜索关键词");
                return false;
            }
            to_page = 1;
            var url = "/position-category/search";
            var request_data = {'keywords': keywords, 'search_type': search_type};
            search_type = $("#selected_keywords").val();
            var url = "/position-category/search";
            var request_data = {'keywords': keywords, 'search_type': search_type};
            var func = "show_position_category";
            pro.click_page(to_page, url, request_data, func);
//                $.post(url, postData, function (data) {
//                    var obj = $.parseJSON(data);
//                    var msg = obj.msg;
//                    var code = obj.code;
//                    var html = obj.data.html;
//                    console.log(msg);
//                    console.log(code);
//                    console.log(html);
//                    $("#page_contains").html('');
//                });
        },
        friendly_link_add: function () {
            var web_name = $("#web_name").val();
            var web_description = $("#web_description").val();
            var web_url = $("#web_url").val();
            var link_sort = $("#link_sort").val();
            var is_show = $('input[name=is_show]:checked').val();
            var postData = {'web_name': web_name, 'web_description': web_description, "web_url": web_url, "link_sort": link_sort, "is_show": is_show};
            var url = "/friendly-link/ajax-save";
            $.post(url, postData, function (data) {
                var obj = $.parseJSON(data);
                var msg = obj.msg;
                var code = obj.code;
                console.log(msg);
                console.log(code);
                if (code === 0) {
                    alert(msg);
                } else {
                    alert(msg);
                }
            });
        },
        show_lottery_info: function (to_page) {
            $("#page_contains").html('');
            var url = "/lottery-info/api-index";
            var func = "show_lottery_info";
            var request_data = {'limit': 20, 'page': to_page};
            pro.click_page(to_page, url, request_data, func);
        },
        show_scrapy_city: function (to_page) {
            $("#page_contains").html('');
            var url = "/scrapy-city/api-show";
            var func = "show_scrapy_city";
            var request_data = {'limit': 20, 'page': to_page};
            pro.click_page(to_page, url, request_data, func);
        },
        show_cto_category: function (to_page) {
            $("#page_contains").html('');
            var url = "/cto-article-spider/api-show";
            var func = "show_cto_category";
            var request_data = {'limit': 20, 'page': to_page};
            pro.click_page(to_page, url, request_data, func);
        },

        cto_category_add: function () {
            var type_name = $("#type_name").val();
            var type_id = $("#type_id").val();
            var type_domain = $("#type_domain").val();
            var sort = $("#sort").val();
            var postData = {'type_name': type_name, 'type_id': type_id, "type_domain": type_domain, "sort": sort};
            var url = "/cto-article-spider/ajax-category-save";
            $.post(url, postData, function (data) {
                var obj = $.parseJSON(data);
                var msg = obj.msg;
                var code = obj.code;
                console.log(msg);
                console.log(code);
                if (code === 0) {
                    alert(msg);
                } else {
                    alert(msg);
                }
            });
        },
        show_cto_article_list: function (to_page){
            $("#page_contains").html('');
            var url = "/cto-article-spider/api-list";
            var func = "show_cto_article_list";
            var request_data = {'limit': 20, 'page': to_page};
            pro.click_page(to_page, url, request_data, func);
        },
        cto_article_info: function(id) {
            window.location.href = "/cto-article-spider/article-info?id="+id;
        }

    };

