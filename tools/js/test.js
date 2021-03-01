!function (e) {
    var t = {};

    function n(r) {
        if (t[r]) return t[r].exports;
        var o = t[r] = {i: r, l: !1, exports: {}};
        return e[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports
    }

    n.m = e, n.c = t, n.d = function (e, t, r) {
        n.o(e, t) || Object.defineProperty(e, t, {enumerable: !0, get: r})
    }, n.r = function (e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e, "__esModule", {value: !0})
    }, n.t = function (e, t) {
        if (1 & t && (e = n(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var r = Object.create(null);
        if (n.r(r), Object.defineProperty(r, "default", {enumerable: !0, value: e}), 2 & t && "string" != typeof e) for (var o in e) n.d(r, o, function (t) {
            return e[t]
        }.bind(null, o));
        return r
    }, n.n = function (e) {
        var t = e && e.__esModule ? function () {
            return e.default
        } : function () {
            return e
        };
        return n.d(t, "a", t), t
    }, n.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, n.p = "", n(n.s = 44)
}({
    44: function (module, exports) {
        layui.use(["layer", "form", "element"], (function () {
            $(".clear-content").on("click", (function () {
                $(".statistics_content").val(""), $(".content").val(""), $("em").html(0)
            })), $(".json-format").on("click", (function () {
                var e = $(".json_content").val();
                try {
                    var t = JSON.parse(e);
                    result = JSON.stringify(t, null, 4), $(".json_content").val(result)
                } catch (e) {
                    $(".json_content").val(e.message)
                }
            })), $(".xml-format").on("click", (function () {
                $(".xml_content").format({method: "xml"})
            })), $(".xml-compress").on("click", (function () {
                $(".xml_content").format({method: "xmlmin"})
            })), $(".sql-format").on("click", (function () {
                $(".sql_content").format({method: "sql"})
            })), $(".sql-compress").on("click", (function () {
                $(".sql_content").format({method: "sqlmin"})
            })), $(".css-format").on("click", (function () {
                $(".css_content").format({method: "css"})
            })), $(".css-compress").on("click", (function () {
                $(".css_content").format({method: "cssmin"})
            })), $(".get-uuid").on("click", (function () {
                $(".uuid_content").empty(), $.post("/other/uuid", {num: 5}, (function (data) {
                    var json = eval(data);
                    for (var index in json) $(".uuid_content").append(json[index] + "\n")
                }), "json")
            })), $(".json2xml").on("click", (function () {
                var content = $(".content").val();
                if (0 != content.length) {
                    var xotree = new XML.ObjTree, json = eval("(" + content + ")");
                    $(".result").val(formatXml(xotree.writeXML(json)))
                }
            })), $(".xml2json").on("click", (function () {
                var e = new XML.ObjTree, t = new JKL.Dumper, n = $(".content").val();
                if (0 != n.length) {
                    var r = e.parseXML(n);
                    $(".result").val(t.dump(r))
                }
            })), $(".encode_url").on("click", (function () {
                var e = $(".content").val();
                if (0 != e.length) {
                    var t = encodeURI(e);
                    $(".result").val(t)
                }
            })), $(".decode_url").on("click", (function () {
                var e = $(".content").val();
                if (0 != e.length) {
                    var t = decodeURI(e);
                    $(".result").val(t)
                }
            })), $(".extract_url").on("click", (function () {
                var e = $(".content").val().match(/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/gi), t = "";
                if (e) for (var n = 0; n < e.length; n++) t += e[n], t += "<br>";
                $(".result").html(t)
            }))
        })), function (e) {
            function t(e, t) {
                return t - (e.replace(/\(/g, "").length - e.replace(/\)/g, "").length)
            }

            function n(e, t) {
                return e.replace(/\s{1,}/g, " ").replace(/ AND /gi, "~::~" + t + t + "AND ").replace(/ BETWEEN /gi, "~::~" + t + "BETWEEN ").replace(/ CASE /gi, "~::~" + t + "CASE ").replace(/ ELSE /gi, "~::~" + t + "ELSE ").replace(/ END /gi, "~::~" + t + "END ").replace(/ FROM /gi, "~::~FROM ").replace(/ GROUP\s{1,}BY/gi, "~::~GROUP BY ").replace(/ HAVING /gi, "~::~HAVING ").replace(/ IN /gi, " IN ").replace(/ JOIN /gi, "~::~JOIN ").replace(/ CROSS~::~{1,}JOIN /gi, "~::~CROSS JOIN ").replace(/ INNER~::~{1,}JOIN /gi, "~::~INNER JOIN ").replace(/ LEFT~::~{1,}JOIN /gi, "~::~LEFT JOIN ").replace(/ RIGHT~::~{1,}JOIN /gi, "~::~RIGHT JOIN ").replace(/ ON /gi, "~::~" + t + "ON ").replace(/ OR /gi, "~::~" + t + t + "OR ").replace(/ ORDER\s{1,}BY/gi, "~::~ORDER BY ").replace(/ OVER /gi, "~::~" + t + "OVER ").replace(/\(\s{0,}SELECT /gi, "~::~(SELECT ").replace(/\)\s{0,}SELECT /gi, ")~::~SELECT ").replace(/ THEN /gi, " THEN~::~" + t).replace(/ UNION /gi, "~::~UNION~::~").replace(/ USING /gi, "~::~USING ").replace(/ WHEN /gi, "~::~" + t + "WHEN ").replace(/ WHERE /gi, "~::~WHERE ").replace(/ WITH /gi, "~::~WITH ").replace(/ ALL /gi, " ALL ").replace(/ AS /gi, " AS ").replace(/ ASC /gi, " ASC ").replace(/ DESC /gi, " DESC ").replace(/ DISTINCT /gi, " DISTINCT ").replace(/ EXISTS /gi, " EXISTS ").replace(/ NOT /gi, " NOT ").replace(/ NULL /gi, " NULL ").replace(/ LIKE /gi, " LIKE ").replace(/\s{0,}SELECT /gi, "SELECT ").replace(/\s{0,}UPDATE /gi, "UPDATE ").replace(/ SET /gi, " SET ").replace(/~::~{1,}/g, "~::~").split("~::~")
            }

            var r = function (t) {
                this.init(t);
                var n = this.options.method;
                e.isFunction(this[n]) || e.error("'" + n + "' is not a Formatter method."), this.format = function (e) {
                    return this[this.options.method].call(this, e)
                }
            };
            r.prototype = {
                options: {}, init: function (t) {
                    this.options = e.extend({}, e.fn.format.defaults, t), this.step = this.options.step, this.preserveComments = this.options.preserveComments, this.shift = function (e) {
                        var t = "    ";
                        t = isNaN(parseInt(e)) ? e : new Array(e + 1).join(" ");
                        for (var n = ["\n"], r = 0; r < 100; r++) n.push(n[r] + t);
                        return n
                    }(this.step)
                }, xml: function (e) {
                    var t = e.replace(/>\s{0,}</g, "><").replace(/</g, "~::~<").replace(/\s*xmlns\:/g, "~::~xmlns:").replace(/\s*xmlns\=/g, "~::~xmlns=").split("~::~"), n = t.length, r = !1, o = 0, i = "", s = 0;
                    for (s = 0; s < n; s++) t[s].search(/<!/) > -1 ? (i += this.shift[o] + t[s], r = !0, (t[s].search(/-->/) > -1 || t[s].search(/\]>/) > -1 || t[s].search(/!DOCTYPE/) > -1) && (r = !1)) : t[s].search(/-->/) > -1 || t[s].search(/\]>/) > -1 ? (i += t[s], r = !1) : /^<\w/.exec(t[s - 1]) && /^<\/\w/.exec(t[s]) && /^<[\w:\-\.\,]+/.exec(t[s - 1]) == /^<\/[\w:\-\.\,]+/.exec(t[s])[0].replace("/", "") ? (i += t[s], r || o--) : t[s].search(/<\w/) > -1 && -1 == t[s].search(/<\//) && -1 == t[s].search(/\/>/) ? i = i += r ? t[s] : this.shift[o++] + t[s] : t[s].search(/<\w/) > -1 && t[s].search(/<\//) > -1 ? i = i += r ? t[s] : this.shift[o] + t[s] : t[s].search(/<\//) > -1 ? i = i += r ? t[s] : this.shift[--o] + t[s] : t[s].search(/\/>/) > -1 ? i = i += r ? t[s] : this.shift[o] + t[s] : t[s].search(/<\?/) > -1 || t[s].search(/xmlns\:/) > -1 || t[s].search(/xmlns\=/) > -1 ? i += this.shift[o] + t[s] : i += t[s];
                    return "\n" == i[0] ? i.slice(1) : i
                }, xmlmin: function (e) {
                    return (this.preserveComments ? e : e.replace(/\<![ \r\n\t]*(--([^\-]|[\r\n]|-[^\-])*--[ \r\n\t]*)\>/g, "").replace(/[ \r\n\t]{1,}xmlns/g, " xmlns")).replace(/>\s{0,}</g, "><")
                }, json: function (e) {
                    return "undefined" == typeof JSON ? e : "string" == typeof e ? JSON.stringify(JSON.parse(e), null, this.step) : "object" == typeof e ? JSON.stringify(e, null, this.step) : e
                }, jsonmin: function (e) {
                    return "undefined" == typeof JSON ? e : JSON.stringify(JSON.parse(e), null, 0)
                }, css: function (e) {
                    var t = e.replace(/\s{1,}/g, " ").replace(/\{/g, "{~::~").replace(/\}/g, "~::~}~::~").replace(/\;/g, ";~::~").replace(/\/\*/g, "~::~/*").replace(/\*\//g, "*/~::~").replace(/~::~\s{0,}~::~/g, "~::~").split("~::~"), n = t.length, r = 0, o = "", i = 0;
                    for (i = 0; i < n; i++) /\{/.exec(t[i]) ? o += this.shift[r++] + t[i] : /\}/.exec(t[i]) ? o += this.shift[--r] + t[i] : (/\*\\/.exec(t[i]), o += this.shift[r] + t[i]);
                    return o.replace(/^\n{1,}/, "")
                }, cssmin: function (e) {
                    return (this.preserveComments ? e : e.replace(/\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+\//g, "")).replace(/\s{1,}/g, " ").replace(/\{\s{1,}/g, "{").replace(/\}\s{1,}/g, "}").replace(/\;\s{1,}/g, ";").replace(/\/\*\s{1,}/g, "/*").replace(/\*\/\s{1,}/g, "*/")
                }, sql: function (e) {
                    var r = e.replace(/\s{1,}/g, " ").replace(/\'/gi, "~::~'").split("~::~"), o = r.length, i = [], s = 0, c = this.step, a = 0, l = "", p = 0;
                    for (p = 0; p < o; p++) i = p % 2 ? i.concat(r[p]) : i.concat(n(r[p], c));
                    for (o = i.length, p = 0; p < o; p++) a = t(i[p], a), /\s{0,}\s{0,}SELECT\s{0,}/.exec(i[p]) && (i[p] = i[p].replace(/\,/g, ",\n" + c + c)), /\s{0,}\s{0,}SET\s{0,}/.exec(i[p]) && (i[p] = i[p].replace(/\,/g, ",\n" + c + c)), /\s{0,}\(\s{0,}SELECT\s{0,}/.exec(i[p]) ? (s++, l += this.shift[s] + i[p]) : /\'/.exec(i[p]) ? (a < 1 && s && s--, l += i[p]) : (l += this.shift[s] + i[p], a < 1 && s && s--);
                    return l = l.replace(/^\n{1,}/, "").replace(/\n{1,}/g, "\n")
                }, sqlmin: function (e) {
                    return e.replace(/\s{1,}/g, " ").replace(/\s{1,}\(/, "(").replace(/\s{1,}\)/, ")")
                }
            }, e.fn.format = function (t) {
                var n = new r(t);
                return this.each((function () {
                    var t = e(this), r = t.val();
                    r = n.format(r), t.val(r)
                }))
            }, e.format = function (e, t) {
                return new r(t).format(e)
            }, e.fn.format.defaults = {method: "xml", step: "    ", preserveComments: !1}
        }(jQuery), "undefined" == typeof XML && (XML = function () {
        }), XML.ObjTree = function () {
            return this
        }, XML.ObjTree.VERSION = "0.23", XML.ObjTree.prototype.xmlDecl = '<?xml version="1.0" encoding="UTF-8" ?>\n', XML.ObjTree.prototype.attr_prefix = "-", XML.ObjTree.prototype.parseXML = function (e) {
            var t;
            if (window.DOMParser) {
                var n = new DOMParser, r = n.parseFromString(e, "application/xml");
                if (!r) return;
                t = r.documentElement
            } else window.ActiveXObject && ((n = new ActiveXObject("Microsoft.XMLDOM")).async = !1, n.loadXML(e), t = n.documentElement);
            if (t) return this.parseDOM(t)
        }, XML.ObjTree.prototype.parseHTTP = function (e, t, n) {
            var r, o = {};
            for (var i in t) o[i] = t[i];
            if (o.method || (void 0 === o.postBody && void 0 === o.postbody && void 0 === o.parameters ? o.method = "get" : o.method = "post"), n) {
                o.asynchronous = !0;
                var s = this, c = n, a = o.onComplete;
                o.onComplete = function (e) {
                    var t;
                    e && e.responseXML && e.responseXML.documentElement && (t = s.parseDOM(e.responseXML.documentElement)), c(t, e), a && a(e)
                }
            } else o.asynchronous = !1;
            if ("undefined" != typeof HTTP && HTTP.Request) o.uri = e, (l = new HTTP.Request(o)) && (r = l.transport); else if ("undefined" != typeof Ajax && Ajax.Request) {
                var l;
                (l = new Ajax.Request(e, o)) && (r = l.transport)
            }
            return n ? r : r && r.responseXML && r.responseXML.documentElement ? this.parseDOM(r.responseXML.documentElement) : void 0
        }, XML.ObjTree.prototype.parseDOM = function (e) {
            if (e) {
                if (this.__force_array = {}, this.force_array) for (var t = 0; t < this.force_array.length; t++) this.__force_array[this.force_array[t]] = 1;
                var n = this.parseElement(e);
                if (this.__force_array[e.nodeName] && (n = [n]), 11 != e.nodeType) {
                    var r = {};
                    r[e.nodeName] = n, n = r
                }
                return n
            }
        }, XML.ObjTree.prototype.parseElement = function (e) {
            if (7 != e.nodeType) {
                if (3 == e.nodeType || 4 == e.nodeType) {
                    if (null == e.nodeValue.match(/[^\x00-\x20]/)) return;
                    return e.nodeValue
                }
                var t, n = {};
                if (e.attributes && e.attributes.length) {
                    t = {};
                    for (var r = 0; r < e.attributes.length; r++) {
                        if ("string" == typeof(s = e.attributes[r].nodeName)) (c = e.attributes[r].nodeValue) && (void 0 === n[s = this.attr_prefix + s] && (n[s] = 0), n[s]++, this.addNode(t, s, n[s], c))
                    }
                }
                if (e.childNodes && e.childNodes.length) {
                    var o = !0;
                    t && (o = !1);
                    for (r = 0; r < e.childNodes.length && o; r++) {
                        var i = e.childNodes[r].nodeType;
                        3 != i && 4 != i && (o = !1)
                    }
                    if (o) {
                        t || (t = "");
                        for (r = 0; r < e.childNodes.length; r++) t += e.childNodes[r].nodeValue
                    } else {
                        t || (t = {});
                        for (r = 0; r < e.childNodes.length; r++) {
                            var s, c;
                            if ("string" == typeof(s = e.childNodes[r].nodeName)) (c = this.parseElement(e.childNodes[r])) && (void 0 === n[s] && (n[s] = 0), n[s]++, this.addNode(t, s, n[s], c))
                        }
                    }
                }
                return t
            }
        }, XML.ObjTree.prototype.addNode = function (e, t, n, r) {
            this.__force_array[t] ? (1 == n && (e[t] = []), e[t][e[t].length] = r) : 1 == n ? e[t] = r : 2 == n ? e[t] = [e[t], r] : e[t][e[t].length] = r
        }, XML.ObjTree.prototype.writeXML = function (e) {
            var t = this.hash_to_xml(null, e);
            return this.xmlDecl + t
        }, XML.ObjTree.prototype.hash_to_xml = function (e, t) {
            var n = [], r = [];
            for (var o in t) if (t.hasOwnProperty(o)) {
                var i = t[o];
                o.charAt(0) != this.attr_prefix ? void 0 === i || null == i ? n[n.length] = "<" + o + " />" : "object" == typeof i && i.constructor == Array ? n[n.length] = this.array_to_xml(o, i) : n[n.length] = "object" == typeof i ? this.hash_to_xml(o, i) : this.scalar_to_xml(o, i) : r[r.length] = " " + o.substring(1) + '="' + this.xml_escape(i) + '"'
            }
            var s = r.join(""), c = n.join("");
            return void 0 === e || null == e || (c = n.length > 0 ? c.match(/\n/) ? "<" + e + s + ">\n" + c + "</" + e + ">\n" : "<" + e + s + ">" + c + "</" + e + ">\n" : "<" + e + s + " />\n"), c
        }, XML.ObjTree.prototype.array_to_xml = function (e, t) {
            for (var n = [], r = 0; r < t.length; r++) {
                var o = t[r];
                void 0 === o || null == o ? n[n.length] = "<" + e + " />" : "object" == typeof o && o.constructor == Array ? n[n.length] = this.array_to_xml(e, o) : n[n.length] = "object" == typeof o ? this.hash_to_xml(e, o) : this.scalar_to_xml(e, o)
            }
            return n.join("")
        }, XML.ObjTree.prototype.scalar_to_xml = function (e, t) {
            return "#text" == e ? this.xml_escape(t) : "<" + e + ">" + this.xml_escape(t) + "</" + e + ">\n"
        }, XML.ObjTree.prototype.xml_escape = function (e) {
            return (e + "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
        }, "undefined" == typeof JKL && (JKL = function () {
        }), JKL.Dumper = function () {
            return this
        }, JKL.Dumper.prototype.dump = function (e, t) {
            void 0 === t && (t = "");
            var n = t + "  ";
            switch (typeof e) {
                case"string":
                    return '"' + this.escapeString(e) + '"';
                case"number":
                    return e;
                case"boolean":
                    return e ? "true" : "false";
                case"undefined":
                    return "null";
                case"object":
                    if (null == e) return "null";
                    if (e.constructor == Array) {
                        for (var r = [], o = 0; o < e.length; o++) r[o] = this.dump(e[o], n);
                        return "[\n" + n + r.join(",\n" + n) + "\n" + t + "]"
                    }
                    r = [];
                    for (var i in e) {
                        var s = this.dump(e[i], n);
                        i = '"' + this.escapeString(i) + '"', r[r.length] = i + ": " + s
                    }
                    return 1 != r.length || r[0].match(/[\n\{\[]/) ? "{\n" + n + r.join(",\n" + n) + "\n" + t + "}" : "{ " + r[0] + " }";
                default:
                    return e
            }
        }, JKL.Dumper.prototype.escapeString = function (e) {
            return e.replace(/\\/g, "\\\\").replace(/\"/g, '\\"')
        };
        var formatXml = function (e) {
            for (var t = "", n = (e = e.replace(/(>)(<)(\/*)/g, "$1\n$2$3").replace(/ *(.*) +\n/g, "$1\n").replace(/(<.+>)(.+\n)/g, "$1\n$2")).split("\n"), r = 0, o = "other", i = {
                "single->single": 0,
                "single->closing": -1,
                "single->opening": 0,
                "single->other": 0,
                "closing->single": 0,
                "closing->closing": -1,
                "closing->opening": 0,
                "closing->other": 0,
                "opening->single": 1,
                "opening->closing": 0,
                "opening->opening": 1,
                "opening->other": 1,
                "other->single": 0,
                "other->closing": -1,
                "other->opening": 0,
                "other->other": 0
            }, s = 0; s < n.length; s++) {
                var c = n[s], a = Boolean(c.match(/<.+\/>/)), l = Boolean(c.match(/<\/.+>/)), p = Boolean(c.match(/<[^!].*>/)), u = a ? "single" : l ? "closing" : p ? "opening" : "other", f = o + "->" + u;
                o = u;
                var h = "";
                r += i[f];
                for (var g = 0; g < r; g++) h += "\t";
                "opening->closing" == f ? t = t.substr(0, t.length - 1) + c + "\n" : t += h + c + "\n"
            }
            return t
        }
    }
});