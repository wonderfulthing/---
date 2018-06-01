



// 滚动框ID、左切换按钮、右切换按钮、切换按钮框ID、是否滚动标志位、方向、是否轮播标志位、移动长度、移动速度、间隔时间、页面显示的数目
function LbMove(boxID, btn_left, btn_right, btnBox, Car, direction, way, moveLengh, speed, Interval, number) {
	var _ID = $("#" + boxID + "");  //滚动框ID
	var _btn_left = $("#" + btn_left + "");  // 左切换按钮
	var _btn_right = $("#" + btn_right + ""); // 右切换按钮
	var _btnBox = $("#" + btnBox + "");  // 按钮切换显示的盒子
	var jsq = 0  //
	var timer;  //
	var cj;  //
	var no_way = 0; //
	var no_wayGet = 0; //
	var fade = 0; //
	var new_time = new Date;

	var ID_liLen, ID_liheight, cbtmBtn;
	ID_liLen = _ID.find("li").length; //li的长度
	ID_liheight = _ID.find("li").innerHeight();  //li的高度

	// 左右轮播 设置滚动框的长度为 单个li的长度*需要显示的个数
	if (direction == "left" || direction == "right") {
		_ID.find("ul").width(ID_liLen * moveLengh);
	// 上下轮播 设置滚动框的高度为 单个li的高度*需要显示的个数  并将按钮的盒子隐藏
	} else if (direction == "top" || direction == "bottom") {
		_ID.find("ul").height(ID_liLen * moveLengh);
		_btnBox.hide()
	// 单张图片显示的时候进行页面的样式设置
	} else if (direction == "fade") {
		_ID.find("ul").width(moveLengh).height(ID_liheight);
		_ID.find("li").eq(0).show().siblings().hide();
		_ID.find("li").css({ "position": "absolute", "left": 0, "top": 0 });
	}
	// 将按钮框清空
	_btnBox.empty();
	// 重新加入圆点进行显示
	for (i = 0; i < ID_liLen; i++) {
		_btnBox.append("<span></span>");
	};
	// 对当前显示的点进行cur标记
	_btnBox.find("span").eq(0).addClass("cur");
	// 对切换方式选择是否需要,不需要则将左右切换按钮进行隐藏
	if (way == false) {
		_btn_left.hide();
		_btn_right.hide();
		_btnBox.hide();
	}

	function Carousel() {
		// 自动切换轮播
		if (way == false) {
			no_way++;

			if (direction == "left") {
				_ID.find("ul").css({ "left": -no_way });
				no_wayGet = parseInt(_ID.find("ul").css("left"));
				if (no_wayGet == -moveLengh) {
					no_way = 0
					_ID.find("li:first").insertAfter(_ID.find("li:last"));
					_ID.find("ul").css({ "left": 0 });
				}
			}

			if (direction == "right") {

				no_wayGet = parseInt(_ID.find("ul").css("left"));
				if (no_wayGet == 0) {
					no_way = -moveLengh
					_ID.find("li:last").insertBefore(_ID.find("li:first"));
					_ID.find("ul").css({ "left": 0 });
				}
				_ID.find("ul").css({ "left": no_way });
			}

			if (direction == "top") {
				_ID.find("ul").css({ "top": -no_way });
				no_wayGet = parseInt(_ID.find("ul").css("top"));
				if (no_wayGet == -moveLengh) {
					no_way = 0
					_ID.find("li:first").insertAfter(_ID.find("li:last"));
					_ID.find("ul").css({ "top": 0 });
				}
			}

			if (direction == "bottom") {

				no_wayGet = parseInt(_ID.find("ul").css("top"));
				if (no_wayGet == 0) {
					no_way = -moveLengh
					_ID.find("li:last").insertBefore(_ID.find("li:first"));
					_ID.find("ul").css({ "top": 0 });
				}
				_ID.find("ul").css({ "top": no_way });
			}

		// 如果是控制轮播按钮
		} else if (way == true) {

			if (direction == "left") {
				_ID.find("ul").animate({ left: -moveLengh }, speed, function () {
					_ID.find("li:first").insertAfter(_ID.find("li:last"));
					_ID.find("ul").css({ "left": 0 });
				});
				if (jsq < ID_liLen - 1) {
					jsq++;
					_btnBox.find("span").eq(jsq).addClass("cur").siblings().removeClass("cur");
				} else {
					jsq = 0;
					_btnBox.find("span").eq(jsq).addClass("cur").siblings().removeClass("cur");
				}

			}

			if (direction == "right") {
				_ID.find("li:last").insertBefore(_ID.find("li:first"));
				_ID.find("ul").css({ "left": -moveLengh });
				_ID.find("ul").stop().animate({ left: 0 }, speed);
				if (jsq > 0) {
					jsq--;
					_btnBox.find("span").eq(jsq).addClass("cur").siblings().removeClass("cur");
				} else {
					jsq = ID_liLen - 1;
					_btnBox.find("span").eq(jsq).addClass("cur").siblings().removeClass("cur");
				}

			}

			if (direction == "top") {
				_ID.find("ul").animate({ top: -moveLengh }, speed, function () {
					_ID.find("li:first").insertAfter(_ID.find("li:last"));
					_ID.find("ul").css({ "top": 0 });
				});
			}

			if (direction == "bottom") {
				_ID.find("li:last").insertBefore(_ID.find("li:first"));
				_ID.find("ul").css({ "top": -moveLengh });
				_ID.find("ul").stop().animate({ top: 0 }, speed);

			}
			// 单张图片的轮播
			if (direction == "fade") {

				if (fade < ID_liLen - 1) {
					fade++;
				} else { fade = 0 }
				_ID.find("li").eq(fade).fadeIn(speed).siblings().fadeOut(speed);
				_btnBox.find("span").eq(fade).addClass("cur").siblings().removeClass("cur");

			}

		}
	}

	// 是否滚动
	if (Car == true) {

		if (ID_liLen > number) {
			timer = setInterval(Carousel, Interval);
		} else {
			clearInterval(timer);
			_btn_left.hide();
			_btn_right.hide();
			_btnBox.hide();
		}
	} else {
		clearInterval(timer);
	}
	// 鼠标悬浮停止滚动
	_ID.find("li").hover(function () {
		clearInterval(timer);
	}, function () {
		if (Car == true) {
			if (ID_liLen > number) {
				timer = setInterval(Carousel, Interval);
			} else {
				clearInterval(timer);
				_btn_left.hide();
				_btn_right.hide();
				_btnBox.hide();
			}
		} else {
			clearInterval(timer);
		}
	});


	_btn_right.hover(function () {
		clearInterval(timer);
	}, function () {
		if (Car == true) {
			if (ID_liLen > number) {
				timer = setInterval(Carousel, Interval);
			} else {
				clearInterval(timer);
				_btn_left.hide();
				_btn_right.hide();
				_btnBox.hide();
			}
		} else {
			clearInterval(timer);
		}

	}).click(function () {
		if (new Date - new_time > 500) {
			new_time = new Date;

			if (direction == "left" || direction == "right") {
				_ID.find("ul").animate({ left: -moveLengh }, speed, function () {
					_ID.find("li:first").insertAfter(_ID.find("li:last"));
					_ID.find("ul").css({ "left": 0 });
				});
			}


			if (direction == "top" || direction == "bottom") {
				_ID.find("ul").animate({ top: -moveLengh }, speed, function () {
					_ID.find("li:first").insertAfter(_ID.find("li:last"));
					_ID.find("ul").css({ "top": 0 });
				});
			}
			if (direction == "fade") {

				if (fade > 0) {
					fade--;
				} else { fade = ID_liLen - 1 }
				_ID.find("li").stop(true, true).eq(fade).fadeIn(speed).siblings().fadeOut(speed);

			}
			if (jsq < ID_liLen - 1) {
				jsq++;
				_btnBox.find("span").eq(jsq).addClass("cur").siblings().removeClass("cur");
			} else {
				jsq = 0;
				_btnBox.find("span").eq(jsq).addClass("cur").siblings().removeClass("cur");
			};


		} else { };
	});
	_btn_left.hover(function () {
		clearInterval(timer);
	}, function () {
		if (Car == true) {
			if (ID_liLen > number) {
				timer = setInterval(Carousel, Interval);
			} else {
				clearInterval(timer);
				_btn_left.hide();
				_btn_right.hide();
				_btnBox.hide();
			}
		} else {
			clearInterval(timer);
		}
	}).click(function () {
		if (new Date - new_time > 500) {
			new_time = new Date;

			if (direction == "left" || direction == "right") {
				_ID.find("li:last").insertBefore(_ID.find("li:first"));
				_ID.find("ul").css({ "left": -moveLengh });
				_ID.find("ul").stop().animate({ left: 0 }, speed);
			}

			if (direction == "top" || direction == "bottom") {
				_ID.find("li:last").insertBefore(_ID.find("li:first"));
				_ID.find("ul").css({ "top": -moveLengh });
				_ID.find("ul").stop().animate({ top: 0 }, speed);

			}
			if (direction == "fade") {

				if (fade < ID_liLen - 1) {
					fade++;
				} else { fade = 0 }
				_ID.find("li").stop(true, true).eq(fade).fadeIn(speed).siblings().fadeOut(speed);

			}
			if (jsq > 0) {
				jsq--;
				_btnBox.find("span").eq(jsq).addClass("cur").siblings().removeClass("cur");
			} else {
				jsq = ID_liLen - 1;
				_btnBox.find("span").eq(jsq).addClass("cur").siblings().removeClass("cur");
			};
		} else { };
	});

	_btnBox.find("span").hover(function () {
		clearInterval(timer);

	}, function () {
		if (Car == true) {
			if (ID_liLen > number) {
				timer = setInterval(Carousel, Interval);
			} else {
				clearInterval(timer);
				_btn_left.hide();
				_btn_right.hide();
				_btnBox.hide();
			}
		} else {
			clearInterval(timer);
		}
	}).click(function () {
		if (new Date - new_time > 500) {
			new_time = new Date;
			cbtmBtn = $(this).index();
			$(this).addClass("cur").siblings().removeClass("cur");
			if (direction == "fade") {
				_ID.find("li").eq(cbtmBtn).fadeIn(speed).siblings().fadeOut(speed);
			} else {
				if (cbtmBtn > jsq) {
					cj = cbtmBtn - jsq;
					jsq = cbtmBtn;

					_ID.find("ul").stop().animate({ left: -moveLengh * cj }, speed, function () {
						for (i = 0; i < cj; i++) {
							_ID.find("ul").css({ "left": 0 })
							_ID.find("li:first").insertAfter(_ID.find("li:last"));
						};
					});
				} else {
					cj = jsq - cbtmBtn;
					jsq = cbtmBtn;
					_ID.find("ul").css({ "left": -moveLengh * cj });
					for (i = 0; i < cj; i++) {
						_ID.find("ul").stop().animate({ left: 0 }, speed);
						_ID.find("li:last").insertBefore(_ID.find("li:first"));
					};
				};
			};
		} else { };
	});
}
