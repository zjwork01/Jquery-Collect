$.extend({
    //添加日期选择器
	AddDate: function(ids) {
		$.each(ids, function(index, value) {
			laydate({
				elem: value
			});
		});
	}
});

$.extend({
    //添加富文本编辑框
    AddKindEditor: function (names,upload,uploadmanage) {
        $.each(names, function (index, value) {
            var editor = [];
            KindEditor.ready(function (K) {
                var et = K.create('textarea[name="'+value+'"]', {
                    uploadJson: upload,
                    fileManagerJson: uploadmanage,
                    allowFileManager: true,
                    afterChange: function () {
                        $('.word_count1').html(this.count()); //字数统计包含HTML代码
                        $('.word_count2').html(this.count('text')); //字数统计包含纯文本、IMG、EMBED，不包含换行符，IMG和EMBED算一个文字
                        ////限制字数
                        var limitNum = 5000; //设定限制字数
                        var pattern = '还可以输入' + limitNum + '字';
                        $('.divWordNum').html(pattern); //输入显示
                        if (this.count('text') > limitNum) {
                            pattern = ('字数超过限制，请适当删除部分内容');
                            //超过字数限制自动截取
                            var strValue = et.text();
                            strValue = strValue.substring(0, limitNum);
                            et.text(strValue);
                        } else {
                            //计算剩余字数
                            var result = limitNum - this.count('text');
                            pattern = '还可以输入' + result + '字';
                            $("#errBeiZhu").removeClass("emptyTip");
                            $("#errBeiZhu").html("");
                        }
                        $('.divWordNum').html(pattern); //输入显示
                    },
                    items: [
                        'undo', 'redo', '|', 'preview', 'cut', 'copy', 'paste',
                        'plainpaste', 'wordpaste', '|', 'justifyleft', 'justifycenter', 'justifyright',
                        'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript',
                        'superscript', 'quickformat', 'selectall', '|', 'fullscreen', '/',
                        'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold',
                        'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', '|',
                        'table', 'hr', 'image'
                    ],
                    newlineTag: 'br',
                    afterBlur: function () {
                        this.sync();
                    }
                });
                editor.push(et);
            });
        });
    }
});

$.extend({
    //添加图片上传按钮
    AddImageUpload: function (ids, upload, swfpath) {
        $.each(ids, function (index, value) {
            var img = $(value+' > img');
            var picker = $(value + ' > .picker');
            var uploader = WebUploader.create({
                auto: true,

                // swf文件路径
                swf: swfpath,

                // 文件接收服务端。
                server: upload,

                // 选择文件的按钮。可选。
                // 内部根据当前运行是创建，可能是input元素，也可能是flash.
                pick: picker,

                // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
                resize: false
            });

            // 当有文件被添加进队列的时候
            uploader.on('fileQueued', function (file) {
                $(value + ' > .state').attr('id', file.id);
                $(value + ' > .state').html('等待上传');
                // 创建缩略图
                uploader.makeThumb(file, function (error, src) {
                    if (error) {
                        img.replaceWith('<span>不能预览</span>');
                        return;
                    }
                    img.attr('src', src);
                }, 350, 228);
            });


            uploader.on('uploadSuccess', function (file) {
                $('#' + file.id).text('已上传');
                img.attr('data-target', file.name);
            });

            uploader.on('uploadError', function (file) {
                $('#' + file.id).text('上传出错');
            });

            $("#ctlBtn").on('click', function () {
                if ($(this).hasClass('disabled')) {
                    return false;
                }
                uploader.upload();
            });
        })
    }
})
