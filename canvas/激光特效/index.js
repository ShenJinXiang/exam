(function() {
    var drawer = {
        option: {
            background: 'hsl(261,43%,7%)',
            lasterNum: 240,
            minv: 1,
            maxv: 3
        },
        init: function() {
            drawer.c = document.getElementById('canvas');
            drawer.w = drawer.c.width = window.innerWidth;
            drawer.h = drawer.c.height = window.innerHeight;
            drawer.ctx = drawer.c.getContext('2d');
            drawer.createLasters(drawer.option.lasterNum, drawer.w, drawer.h, drawer.option.minv, drawer.option.maxv);
            drawer.animate();
            drawer.bindEvent();
        },
        bindEvent: function() {
            window.onresize = function() {
                drawer.w = drawer.c.width = window.innerWidth;
                drawer.h = drawer.c.height = window.innerHeight;
                drawer.createLasters(drawer.option.lasterNum, drawer.w, drawer.h, drawer.option.minv, drawer.option.maxv);
            };
        },
        animate: function() {
            drawer.update();
            drawer.draw();
            requestAnimationFrame(drawer.animate);
        },
        update: function() {
            drawer.lasters.forEach(function(item) {
                item.y -= item.v;
                if (item.y + item.len < 0) {
                    item.y = drawer.h;
                }
            });
        },
        draw: function() {
            var ctx = drawer.ctx;
            ctx.fillStyle = drawer.option.background;
            ctx.fillRect(0, 0, drawer.w, drawer.h);

            drawer.lasters.forEach(function(item) {
                item.draw(ctx);
            });
        },
        createLasters: function(num, w, h, minv, maxv) {
            drawer.lasters = [];
            for (var i = 0; i < num; i++) {
                drawer.lasters.push(new drawer.Laster(w, h, minv, maxv));
            }
        },
        Laster: function(w, h, minv, maxv) {
            this.x = w * Math.random();
            this.y = h * Math.random();
            this.v = (maxv - minv) * Math.random() + minv;
            this.len = 200;
            this.draw = function(ctx) {
                var grad = ctx.createLinearGradient(this.x, this.y, this.x, this.y + this.len);
                var a = 1 - (h - this.y) / h * 0.8;
                grad.addColorStop(0, 'hsla(340, 100%, 100%, ' + a + ')');
                grad.addColorStop(1, 'hsla(340, 100%, 50%, 0)');
                ctx.strokeStyle = grad;
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(this.x, this.y + this.len);
                ctx.stroke();
            };
        }
    };

    drawer.init();
})();
