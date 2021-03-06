! function(t, e) {
  "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = t || self).Konva = e()
}(this, function() {
  "use strict";
  /*
   * Konva JavaScript Framework v4.2.2
   * http://konvajs.org/
   * Licensed under the MIT
   * Date: Thu Mar 26 2020
   *
   * Original work Copyright (C) 2011 - 2013 by Eric Rowell (KineticJS)
   * Modified work Copyright (C) 2014 - present by Anton Lavrenov (Konva)
   *
   * @license
   */
  var e = Math.PI / 180;

  function t(t) {
    var e = t.toLowerCase(),
      i = /(chrome)[ /]([\w.]+)/.exec(e) || /(webkit)[ /]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[ /]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || e.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e) || [],
      n = !!t.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i),
      r = !!t.match(/IEMobile/i);
    return {
      browser: i[1] || "",
      version: i[2] || "0",
      isIE: function(t) {
        var e = t.indexOf("msie ");
        if (0 < e) return parseInt(t.substring(e + 5, t.indexOf(".", e)), 10);
        if (0 < t.indexOf("trident/")) {
          var i = t.indexOf("rv:");
          return parseInt(t.substring(i + 3, t.indexOf(".", i)), 10)
        }
        var n = t.indexOf("edge/");
        return 0 < n && parseInt(t.substring(n + 5, t.indexOf(".", n)), 10)
      }(e),
      mobile: n,
      ieMobile: r
    }
  }

  function i(t) {
    s[t.prototype.getClassName()] = t, O[t.prototype.getClassName()] = t
  }
  var n = "undefined" != typeof global ? global : "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope ? self : {},
    O = {
      _global: n,
      version: "4.2.2",
      isBrowser: "undefined" != typeof window && ("[object Window]" === {}.toString.call(window) || "[object global]" === {}.toString.call(window)),
      isUnminified: /param/.test(function(t) {}.toString()),
      dblClickWindow: 400,
      getAngle: function(t) {
        return O.angleDeg ? t * e : t
      },
      enableTrace: !1,
      _pointerEventsEnabled: !1,
      hitOnDragEnabled: !1,
      captureTouchEventsEnabled: !1,
      listenClickTap: !1,
      inDblClickWindow: !1,
      pixelRatio: void 0,
      dragDistance: 3,
      angleDeg: !0,
      showWarnings: !0,
      dragButtons: [0, 1],
      isDragging: function() {
        return O.DD.isDragging
      },
      isDragReady: function() {
        return !!O.DD.node
      },
      UA: t(n.navigator && n.navigator.userAgent || ""),
      document: n.document,
      _injectGlobal: function(t) {
        n.Konva = t
      },
      _parseUA: t
    },
    s = {},
    o = (r.toCollection = function(t) {
      var e, i = new r,
        n = t.length;
      for (e = 0; e < n; e++) i.push(t[e]);
      return i
    }, r._mapMethod = function(n) {
      r.prototype[n] = function() {
        var t, e = this.length,
          i = [].slice.call(arguments);
        for (t = 0; t < e; t++) this[t][n].apply(this[t], i);
        return this
      }
    }, r.mapMethods = function(t) {
      var e = t.prototype;
      for (var i in e) r._mapMethod(i)
    }, r);

  function r() {}
  o.prototype = [], o.prototype.each = function(t) {
    for (var e = 0; e < this.length; e++) t(this[e], e)
  }, o.prototype.toArray = function() {
    var t, e = [],
      i = this.length;
    for (t = 0; t < i; t++) e.push(this[t]);
    return e
  };
  var d = (a.prototype.copy = function() {
    return new a(this.m)
  }, a.prototype.point = function(t) {
    var e = this.m;
    return {
      x: e[0] * t.x + e[2] * t.y + e[4],
      y: e[1] * t.x + e[3] * t.y + e[5]
    }
  }, a.prototype.translate = function(t, e) {
    return this.m[4] += this.m[0] * t + this.m[2] * e, this.m[5] += this.m[1] * t + this.m[3] * e, this
  }, a.prototype.scale = function(t, e) {
    return this.m[0] *= t, this.m[1] *= t, this.m[2] *= e, this.m[3] *= e, this
  }, a.prototype.rotate = function(t) {
    var e = Math.cos(t),
      i = Math.sin(t),
      n = this.m[0] * e + this.m[2] * i,
      r = this.m[1] * e + this.m[3] * i,
      o = this.m[0] * -i + this.m[2] * e,
      a = this.m[1] * -i + this.m[3] * e;
    return this.m[0] = n, this.m[1] = r, this.m[2] = o, this.m[3] = a, this
  }, a.prototype.getTranslation = function() {
    return {
      x: this.m[4],
      y: this.m[5]
    }
  }, a.prototype.skew = function(t, e) {
    var i = this.m[0] + this.m[2] * e,
      n = this.m[1] + this.m[3] * e,
      r = this.m[2] + this.m[0] * t,
      o = this.m[3] + this.m[1] * t;
    return this.m[0] = i, this.m[1] = n, this.m[2] = r, this.m[3] = o, this
  }, a.prototype.multiply = function(t) {
    var e = this.m[0] * t.m[0] + this.m[2] * t.m[1],
      i = this.m[1] * t.m[0] + this.m[3] * t.m[1],
      n = this.m[0] * t.m[2] + this.m[2] * t.m[3],
      r = this.m[1] * t.m[2] + this.m[3] * t.m[3],
      o = this.m[0] * t.m[4] + this.m[2] * t.m[5] + this.m[4],
      a = this.m[1] * t.m[4] + this.m[3] * t.m[5] + this.m[5];
    return this.m[0] = e, this.m[1] = i, this.m[2] = n, this.m[3] = r, this.m[4] = o, this.m[5] = a, this
  }, a.prototype.invert = function() {
    var t = 1 / (this.m[0] * this.m[3] - this.m[1] * this.m[2]),
      e = this.m[3] * t,
      i = -this.m[1] * t,
      n = -this.m[2] * t,
      r = this.m[0] * t,
      o = t * (this.m[2] * this.m[5] - this.m[3] * this.m[4]),
      a = t * (this.m[1] * this.m[4] - this.m[0] * this.m[5]);
    return this.m[0] = e, this.m[1] = i, this.m[2] = n, this.m[3] = r, this.m[4] = o, this.m[5] = a, this
  }, a.prototype.getMatrix = function() {
    return this.m
  }, a.prototype.setAbsolutePosition = function(t, e) {
    var i = this.m[0],
      n = this.m[1],
      r = this.m[2],
      o = this.m[3],
      a = this.m[4],
      s = (i * (e - this.m[5]) - n * (t - a)) / (i * o - n * r),
      h = (t - a - r * s) / i;
    return this.translate(h, s)
  }, a);

  function a(t) {
    void 0 === t && (t = [1, 0, 0, 1, 0, 0]), this.m = t && t.slice() || [1, 0, 0, 1, 0, 0]
  }
  var h = Math.PI / 180,
    l = 180 / Math.PI,
    c = "Konva error: ",
    p = {
      aliceblue: [240, 248, 255],
      antiquewhite: [250, 235, 215],
      aqua: [0, 255, 255],
      aquamarine: [127, 255, 212],
      azure: [240, 255, 255],
      beige: [245, 245, 220],
      bisque: [255, 228, 196],
      black: [0, 0, 0],
      blanchedalmond: [255, 235, 205],
      blue: [0, 0, 255],
      blueviolet: [138, 43, 226],
      brown: [165, 42, 42],
      burlywood: [222, 184, 135],
      cadetblue: [95, 158, 160],
      chartreuse: [127, 255, 0],
      chocolate: [210, 105, 30],
      coral: [255, 127, 80],
      cornflowerblue: [100, 149, 237],
      cornsilk: [255, 248, 220],
      crimson: [220, 20, 60],
      cyan: [0, 255, 255],
      darkblue: [0, 0, 139],
      darkcyan: [0, 139, 139],
      darkgoldenrod: [184, 132, 11],
      darkgray: [169, 169, 169],
      darkgreen: [0, 100, 0],
      darkgrey: [169, 169, 169],
      darkkhaki: [189, 183, 107],
      darkmagenta: [139, 0, 139],
      darkolivegreen: [85, 107, 47],
      darkorange: [255, 140, 0],
      darkorchid: [153, 50, 204],
      darkred: [139, 0, 0],
      darksalmon: [233, 150, 122],
      darkseagreen: [143, 188, 143],
      darkslateblue: [72, 61, 139],
      darkslategray: [47, 79, 79],
      darkslategrey: [47, 79, 79],
      darkturquoise: [0, 206, 209],
      darkviolet: [148, 0, 211],
      deeppink: [255, 20, 147],
      deepskyblue: [0, 191, 255],
      dimgray: [105, 105, 105],
      dimgrey: [105, 105, 105],
      dodgerblue: [30, 144, 255],
      firebrick: [178, 34, 34],
      floralwhite: [255, 255, 240],
      forestgreen: [34, 139, 34],
      fuchsia: [255, 0, 255],
      gainsboro: [220, 220, 220],
      ghostwhite: [248, 248, 255],
      gold: [255, 215, 0],
      goldenrod: [218, 165, 32],
      gray: [128, 128, 128],
      green: [0, 128, 0],
      greenyellow: [173, 255, 47],
      grey: [128, 128, 128],
      honeydew: [240, 255, 240],
      hotpink: [255, 105, 180],
      indianred: [205, 92, 92],
      indigo: [75, 0, 130],
      ivory: [255, 255, 240],
      khaki: [240, 230, 140],
      lavender: [230, 230, 250],
      lavenderblush: [255, 240, 245],
      lawngreen: [124, 252, 0],
      lemonchiffon: [255, 250, 205],
      lightblue: [173, 216, 230],
      lightcoral: [240, 128, 128],
      lightcyan: [224, 255, 255],
      lightgoldenrodyellow: [250, 250, 210],
      lightgray: [211, 211, 211],
      lightgreen: [144, 238, 144],
      lightgrey: [211, 211, 211],
      lightpink: [255, 182, 193],
      lightsalmon: [255, 160, 122],
      lightseagreen: [32, 178, 170],
      lightskyblue: [135, 206, 250],
      lightslategray: [119, 136, 153],
      lightslategrey: [119, 136, 153],
      lightsteelblue: [176, 196, 222],
      lightyellow: [255, 255, 224],
      lime: [0, 255, 0],
      limegreen: [50, 205, 50],
      linen: [250, 240, 230],
      magenta: [255, 0, 255],
      maroon: [128, 0, 0],
      mediumaquamarine: [102, 205, 170],
      mediumblue: [0, 0, 205],
      mediumorchid: [186, 85, 211],
      mediumpurple: [147, 112, 219],
      mediumseagreen: [60, 179, 113],
      mediumslateblue: [123, 104, 238],
      mediumspringgreen: [0, 250, 154],
      mediumturquoise: [72, 209, 204],
      mediumvioletred: [199, 21, 133],
      midnightblue: [25, 25, 112],
      mintcream: [245, 255, 250],
      mistyrose: [255, 228, 225],
      moccasin: [255, 228, 181],
      navajowhite: [255, 222, 173],
      navy: [0, 0, 128],
      oldlace: [253, 245, 230],
      olive: [128, 128, 0],
      olivedrab: [107, 142, 35],
      orange: [255, 165, 0],
      orangered: [255, 69, 0],
      orchid: [218, 112, 214],
      palegoldenrod: [238, 232, 170],
      palegreen: [152, 251, 152],
      paleturquoise: [175, 238, 238],
      palevioletred: [219, 112, 147],
      papayawhip: [255, 239, 213],
      peachpuff: [255, 218, 185],
      peru: [205, 133, 63],
      pink: [255, 192, 203],
      plum: [221, 160, 203],
      powderblue: [176, 224, 230],
      purple: [128, 0, 128],
      rebeccapurple: [102, 51, 153],
      red: [255, 0, 0],
      rosybrown: [188, 143, 143],
      royalblue: [65, 105, 225],
      saddlebrown: [139, 69, 19],
      salmon: [250, 128, 114],
      sandybrown: [244, 164, 96],
      seagreen: [46, 139, 87],
      seashell: [255, 245, 238],
      sienna: [160, 82, 45],
      silver: [192, 192, 192],
      skyblue: [135, 206, 235],
      slateblue: [106, 90, 205],
      slategray: [119, 128, 144],
      slategrey: [119, 128, 144],
      snow: [255, 255, 250],
      springgreen: [0, 255, 127],
      steelblue: [70, 130, 180],
      tan: [210, 180, 140],
      teal: [0, 128, 128],
      thistle: [216, 191, 216],
      transparent: [255, 255, 255, 0],
      tomato: [255, 99, 71],
      turquoise: [64, 224, 208],
      violet: [238, 130, 238],
      wheat: [245, 222, 179],
      white: [255, 255, 255],
      whitesmoke: [245, 245, 245],
      yellow: [255, 255, 0],
      yellowgreen: [154, 205, 5]
    },
    u = /rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)/,
    f = [],
    L = {
      _isElement: function(t) {
        return !(!t || 1 != t.nodeType)
      },
      _isFunction: function(t) {
        return !!(t && t.constructor && t.call && t.apply)
      },
      _isPlainObject: function(t) {
        return !!t && t.constructor === Object
      },
      _isArray: function(t) {
        return "[object Array]" === Object.prototype.toString.call(t)
      },
      _isNumber: function(t) {
        return "[object Number]" === Object.prototype.toString.call(t) && !isNaN(t) && isFinite(t)
      },
      _isString: function(t) {
        return "[object String]" === Object.prototype.toString.call(t)
      },
      _isBoolean: function(t) {
        return "[object Boolean]" === Object.prototype.toString.call(t)
      },
      isObject: function(t) {
        return t instanceof Object
      },
      isValidSelector: function(t) {
        if ("string" != typeof t) return !1;
        var e = t[0];
        return "#" === e || "." === e || e === e.toUpperCase()
      },
      _sign: function(t) {
        return 0 === t ? 0 : 0 < t ? 1 : -1
      },
      requestAnimFrame: function(t) {
        f.push(t), 1 === f.length && requestAnimationFrame(function() {
          var t = f;
          f = [], t.forEach(function(t) {
            t()
          })
        })
      },
      createCanvasElement: function() {
        var t = document.createElement("canvas");
        try {
          t.style = t.style || {}
        } catch (t) {}
        return t
      },
      createImageElement: function() {
        return document.createElement("img")
      },
      _isInDocument: function(t) {
        for (; t = t.parentNode;)
          if (t == document) return !0;
        return !1
      },
      _simplifyArray: function(t) {
        var e, i, n = [],
          r = t.length,
          o = L;
        for (e = 0; e < r; e++) i = t[e], o._isNumber(i) ? i = Math.round(1e3 * i) / 1e3 : o._isString(i) || (i = i.toString()), n.push(i);
        return n
      },
      _urlToImage: function(t, e) {
        var i = new n.Image;
        i.onload = function() {
          e(i)
        }, i.src = t
      },
      _rgbToHex: function(t, e, i) {
        return ((1 << 24) + (t << 16) + (e << 8) + i).toString(16).slice(1)
      },
      _hexToRgb: function(t) {
        t = t.replace("#", "");
        var e = parseInt(t, 16);
        return {
          r: e >> 16 & 255,
          g: e >> 8 & 255,
          b: 255 & e
        }
      },
      getRandomColor: function() {
        for (var t = (16777215 * Math.random() << 0).toString(16); t.length < 6;) t = "0" + t;
        return "#" + t
      },
      get: function(t, e) {
        return void 0 === t ? e : t
      },
      getRGB: function(t) {
        var e;
        return t in p ? {
          r: (e = p[t])[0],
          g: e[1],
          b: e[2]
        } : "#" === t[0] ? this._hexToRgb(t.substring(1)) : "rgb(" === t.substr(0, 4) ? (e = u.exec(t.replace(/ /g, "")), {
          r: parseInt(e[1], 10),
          g: parseInt(e[2], 10),
          b: parseInt(e[3], 10)
        }) : {
          r: 0,
          g: 0,
          b: 0
        }
      },
      colorToRGBA: function(t) {
        return t = t || "black", L._namedColorToRBA(t) || L._hex3ColorToRGBA(t) || L._hex6ColorToRGBA(t) || L._rgbColorToRGBA(t) || L._rgbaColorToRGBA(t) || L._hslColorToRGBA(t)
      },
      _namedColorToRBA: function(t) {
        var e = p[t.toLowerCase()];
        return e ? {
          r: e[0],
          g: e[1],
          b: e[2],
          a: 1
        } : null
      },
      _rgbColorToRGBA: function(t) {
        if (0 === t.indexOf("rgb(")) {
          var e = (t = t.match(/rgb\(([^)]+)\)/)[1]).split(/ *, */).map(Number);
          return {
            r: e[0],
            g: e[1],
            b: e[2],
            a: 1
          }
        }
      },
      _rgbaColorToRGBA: function(t) {
        if (0 === t.indexOf("rgba(")) {
          var e = (t = t.match(/rgba\(([^)]+)\)/)[1]).split(/ *, */).map(Number);
          return {
            r: e[0],
            g: e[1],
            b: e[2],
            a: e[3]
          }
        }
      },
      _hex6ColorToRGBA: function(t) {
        if ("#" === t[0] && 7 === t.length) return {
          r: parseInt(t.slice(1, 3), 16),
          g: parseInt(t.slice(3, 5), 16),
          b: parseInt(t.slice(5, 7), 16),
          a: 1
        }
      },
      _hex3ColorToRGBA: function(t) {
        if ("#" === t[0] && 4 === t.length) return {
          r: parseInt(t[1] + t[1], 16),
          g: parseInt(t[2] + t[2], 16),
          b: parseInt(t[3] + t[3], 16),
          a: 1
        }
      },
      _hslColorToRGBA: function(t) {
        if (/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.test(t)) {
          var e = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(t),
            i = (e[0], e.slice(1)),
            n = Number(i[0]) / 360,
            r = Number(i[1]) / 100,
            o = Number(i[2]) / 100,
            a = void 0,
            s = void 0,
            h = void 0;
          if (0 == r) return h = 255 * o, {
            r: Math.round(h),
            g: Math.round(h),
            b: Math.round(h),
            a: 1
          };
          for (var l = 2 * o - (a = o < .5 ? o * (1 + r) : o + r - o * r), d = [0, 0, 0], c = 0; c < 3; c++)(s = n + 1 / 3 * -(c - 1)) < 0 && s++, 1 < s && s--, h = 6 * s < 1 ? l + 6 * (a - l) * s : 2 * s < 1 ? a : 3 * s < 2 ? l + (a - l) * (2 / 3 - s) * 6 : l, d[c] = 255 * h;
          return {
            r: Math.round(d[0]),
            g: Math.round(d[1]),
            b: Math.round(d[2]),
            a: 1
          }
        }
      },
      haveIntersection: function(t, e) {
        return !(e.x > t.x + t.width || e.x + e.width < t.x || e.y > t.y + t.height || e.y + e.height < t.y)
      },
      cloneObject: function(t) {
        var e = {};
        for (var i in t) this._isPlainObject(t[i]) ? e[i] = this.cloneObject(t[i]) : this._isArray(t[i]) ? e[i] = this.cloneArray(t[i]) : e[i] = t[i];
        return e
      },
      cloneArray: function(t) {
        return t.slice(0)
      },
      _degToRad: function(t) {
        return t * h
      },
      _radToDeg: function(t) {
        return t * l
      },
      _capitalize: function(t) {
        return t.charAt(0).toUpperCase() + t.slice(1)
      },
      throw: function(t) {
        throw new Error(c + t)
      },
      error: function(t) {
        console.error(c + t)
      },
      warn: function(t) {
        O.showWarnings && console.warn("Konva warning: " + t)
      },
      extend: function(t, e) {
        function i() {
          this.constructor = t
        }
        i.prototype = e.prototype;
        var n = t.prototype;
        for (var r in t.prototype = new i, n) n.hasOwnProperty(r) && (t.prototype[r] = n[r]);
        t.__super__ = e.prototype, t.super = e
      },
      _getControlPoints: function(t, e, i, n, r, o, a) {
        var s = Math.sqrt(Math.pow(i - t, 2) + Math.pow(n - e, 2)),
          h = Math.sqrt(Math.pow(r - i, 2) + Math.pow(o - n, 2)),
          l = a * s / (s + h),
          d = a * h / (s + h);
        return [i - l * (r - t), n - l * (o - e), i + d * (r - t), n + d * (o - e)]
      },
      _expandPoints: function(t, e) {
        var i, n, r = t.length,
          o = [];
        for (i = 2; i < r - 2; i += 2) n = L._getControlPoints(t[i - 2], t[i - 1], t[i], t[i + 1], t[i + 2], t[i + 3], e), o.push(n[0]), o.push(n[1]), o.push(t[i]), o.push(t[i + 1]), o.push(n[2]), o.push(n[3]);
        return o
      },
      each: function(t, e) {
        for (var i in t) e(i, t[i])
      },
      _inRange: function(t, e, i) {
        return e <= t && t < i
      },
      _getProjectionToSegment: function(t, e, i, n, r, o) {
        var a, s, h, l = (t - i) * (t - i) + (e - n) * (e - n);
        if (0 == l) a = t, s = e, h = (r - i) * (r - i) + (o - n) * (o - n);
        else {
          var d = ((r - t) * (i - t) + (o - e) * (n - e)) / l;
          h = d < 0 ? ((a = t) - r) * (t - r) + ((s = e) - o) * (e - o) : 1 < d ? ((a = i) - r) * (i - r) + ((s = n) - o) * (n - o) : ((a = t + d * (i - t)) - r) * (a - r) + ((s = e + d * (n - e)) - o) * (s - o)
        }
        return [a, s, h]
      },
      _getProjectionToLine: function(s, h, l) {
        var d = L.cloneObject(s),
          c = Number.MAX_VALUE;
        return h.forEach(function(t, e) {
          if (l || e !== h.length - 1) {
            var i = h[(e + 1) % h.length],
              n = L._getProjectionToSegment(t.x, t.y, i.x, i.y, s.x, s.y),
              r = n[0],
              o = n[1],
              a = n[2];
            a < c && (d.x = r, d.y = o, c = a)
          }
        }), d
      },
      _prepareArrayForTween: function(t, e, i) {
        var n, r = [],
          o = [];
        if (t.length > e.length) {
          var a = e;
          e = t, t = a
        }
        for (n = 0; n < t.length; n += 2) r.push({
          x: t[n],
          y: t[n + 1]
        });
        for (n = 0; n < e.length; n += 2) o.push({
          x: e[n],
          y: e[n + 1]
        });
        var s = [];
        return o.forEach(function(t) {
          var e = L._getProjectionToLine(t, r, i);
          s.push(e.x), s.push(e.y)
        }), s
      },
      _prepareToStringify: function(t) {
        var e;
        for (var i in t.visitedByCircularReferenceRemoval = !0, t)
          if (t.hasOwnProperty(i) && t[i] && "object" == typeof t[i])
            if (e = Object.getOwnPropertyDescriptor(t, i), t[i].visitedByCircularReferenceRemoval || L._isElement(t[i])) {
              if (!e.configurable) return null;
              delete t[i]
            } else if (null === L._prepareToStringify(t[i])) {
          if (!e.configurable) return null;
          delete t[i]
        }
        return delete t.visitedByCircularReferenceRemoval, t
      },
      _assign: function(t, e) {
        for (var i in e) t[i] = e[i];
        return t
      },
      _getFirstPointerId: function(t) {
        return t.touches ? t.changedTouches[0].identifier : 999
      }
    };

  function g(t) {
    return L._isString(t) ? '"' + t + '"' : "[object Number]" === Object.prototype.toString.call(t) ? t : L._isBoolean(t) ? t : Object.prototype.toString.call(t)
  }

  function v(t) {
    return 255 < t ? 255 : t < 0 ? 0 : Math.round(t)
  }

  function y() {
    if (O.isUnminified) return function(t, e) {
      return L._isNumber(t) || L.warn(g(t) + ' is a not valid value for "' + e + '" attribute. The value should be a number.'), t
    }
  }

  function m() {
    if (O.isUnminified) return function(t, e) {
      return L._isNumber(t) || "auto" === t || L.warn(g(t) + ' is a not valid value for "' + e + '" attribute. The value should be a number or "auto".'), t
    }
  }

  function _() {
    if (O.isUnminified) return function(t, e) {
      return L._isString(t) || L.warn(g(t) + ' is a not valid value for "' + e + '" attribute. The value should be a string.'), t
    }
  }

  function S() {
    if (O.isUnminified) return function(t, e) {
      return !0 === t || !1 === t || L.warn(g(t) + ' is a not valid value for "' + e + '" attribute. The value should be a boolean.'), t
    }
  }
  var b = "get",
    x = "set",
    w = {
      addGetterSetter: function(t, e, i, n, r) {
        this.addGetter(t, e, i), this.addSetter(t, e, n, r), this.addOverloadedGetterSetter(t, e)
      },
      addGetter: function(t, e, i) {
        var n = b + L._capitalize(e);
        t.prototype[n] = t.prototype[n] || function() {
          var t = this.attrs[e];
          return void 0 === t ? i : t
        }
      },
      addSetter: function(t, e, i, n) {
        var r = x + L._capitalize(e);
        t.prototype[r] || w.overWriteSetter(t, e, i, n)
      },
      overWriteSetter: function(t, e, i, n) {
        var r = x + L._capitalize(e);
        t.prototype[r] = function(t) {
          return i && null != t && (t = i.call(this, t, e)), this._setAttr(e, t), n && n.call(this), this
        }
      },
      addComponentsGetterSetter: function(t, n, e, r, o) {
        var i, a, s = e.length,
          h = L._capitalize,
          l = b + h(n),
          d = x + h(n);
        t.prototype[l] = function() {
          var t = {};
          for (i = 0; i < s; i++) t[a = e[i]] = this.getAttr(n + h(a));
          return t
        };
        var c = function(i) {
          if (O.isUnminified) return function(t, e) {
            return L.isObject(t) || L.warn(g(t) + ' is a not valid value for "' + e + '" attribute. The value should be an object with properties ' + i), t
          }
        }(e);
        t.prototype[d] = function(t) {
          var e, i = this.attrs[n];
          for (e in r && (t = r.call(this, t)), c && c.call(this, t, n), t) t.hasOwnProperty(e) && this._setAttr(n + h(e), t[e]);
          return this._fireChangeEvent(n, i, t), o && o.call(this), this
        }, this.addOverloadedGetterSetter(t, n)
      },
      addOverloadedGetterSetter: function(t, e) {
        var i = L._capitalize(e),
          n = x + i,
          r = b + i;
        t.prototype[e] = function() {
          return arguments.length ? (this[n](arguments[0]), this) : this[r]()
        }
      },
      addDeprecatedGetterSetter: function(t, e, i, n) {
        L.error("Adding deprecated " + e);
        var r = b + L._capitalize(e),
          o = e + " property is deprecated and will be removed soon. Look at Konva change log for more information.";
        t.prototype[r] = function() {
          L.error(o);
          var t = this.attrs[e];
          return void 0 === t ? i : t
        }, this.addSetter(t, e, n, function() {
          L.error(o)
        }), this.addOverloadedGetterSetter(t, e)
      },
      backCompat: function(a, t) {
        L.each(t, function(t, e) {
          var i = a.prototype[e],
            n = b + L._capitalize(t),
            r = x + L._capitalize(t);

          function o() {
            i.apply(this, arguments), L.error('"' + t + '" method is deprecated and will be removed soon. Use ""' + e + '" instead.')
          }
          a.prototype[t] = o, a.prototype[n] = o, a.prototype[r] = o
        })
      },
      afterSetFilter: function() {
        this._filterUpToDate = !1
      }
    },
    C = function(t, e) {
      return (C = Object.setPrototypeOf || {
          __proto__: []
        }
        instanceof Array && function(t, e) {
          t.__proto__ = e
        } || function(t, e) {
          for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i])
        })(t, e)
    };

  function P(t, e) {
    function i() {
      this.constructor = t
    }
    C(t, e), t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype, new i)
  }
  var k = ["arc", "arcTo", "beginPath", "bezierCurveTo", "clearRect", "clip", "closePath", "createLinearGradient", "createPattern", "createRadialGradient", "drawImage", "ellipse", "fill", "fillText", "getImageData", "createImageData", "lineTo", "moveTo", "putImageData", "quadraticCurveTo", "rect", "restore", "rotate", "save", "scale", "setLineDash", "setTransform", "stroke", "strokeText", "transform", "translate"],
    T = (A.prototype.fillShape = function(t) {
      t.fillEnabled() && this._fill(t)
    }, A.prototype._fill = function(t) {}, A.prototype.strokeShape = function(t) {
      t.hasStroke() && this._stroke(t)
    }, A.prototype._stroke = function(t) {}, A.prototype.fillStrokeShape = function(t) {
      this.fillShape(t), this.strokeShape(t)
    }, A.prototype.getTrace = function(t) {
      var e, i, n, r, o = this.traceArr,
        a = o.length,
        s = "";
      for (e = 0; e < a; e++)(n = (i = o[e]).method) ? (r = i.args, s += n, t ? s += "()" : L._isArray(r[0]) ? s += "([" + r.join(",") + "])" : s += "(" + r.join(",") + ")") : (s += i.property, t || (s += "=" + i.val)), s += ";";
      return s
    }, A.prototype.clearTrace = function() {
      this.traceArr = []
    }, A.prototype._trace = function(t) {
      var e = this.traceArr;
      e.push(t), 100 <= e.length && e.shift()
    }, A.prototype.reset = function() {
      var t = this.getCanvas().getPixelRatio();
      this.setTransform(1 * t, 0, 0, 1 * t, 0, 0)
    }, A.prototype.getCanvas = function() {
      return this.canvas
    }, A.prototype.clear = function(t) {
      var e = this.getCanvas();
      t ? this.clearRect(t.x || 0, t.y || 0, t.width || 0, t.height || 0) : this.clearRect(0, 0, e.getWidth() / e.pixelRatio, e.getHeight() / e.pixelRatio)
    }, A.prototype._applyLineCap = function(t) {
      var e = t.getLineCap();
      e && this.setAttr("lineCap", e)
    }, A.prototype._applyOpacity = function(t) {
      var e = t.getAbsoluteOpacity();
      1 !== e && this.setAttr("globalAlpha", e)
    }, A.prototype._applyLineJoin = function(t) {
      var e = t.getLineJoin();
      e && this.setAttr("lineJoin", e)
    }, A.prototype.setAttr = function(t, e) {
      this._context[t] = e
    }, A.prototype.arc = function(t, e, i, n, r, o) {
      this._context.arc(t, e, i, n, r, o)
    }, A.prototype.arcTo = function(t, e, i, n, r) {
      this._context.arcTo(t, e, i, n, r)
    }, A.prototype.beginPath = function() {
      this._context.beginPath()
    }, A.prototype.bezierCurveTo = function(t, e, i, n, r, o) {
      this._context.bezierCurveTo(t, e, i, n, r, o)
    }, A.prototype.clearRect = function(t, e, i, n) {
      this._context.clearRect(t, e, i, n)
    }, A.prototype.clip = function() {
      this._context.clip()
    }, A.prototype.closePath = function() {
      this._context.closePath()
    }, A.prototype.createImageData = function(t, e) {
      var i = arguments;
      return 2 === i.length ? this._context.createImageData(t, e) : 1 === i.length ? this._context.createImageData(t) : void 0
    }, A.prototype.createLinearGradient = function(t, e, i, n) {
      return this._context.createLinearGradient(t, e, i, n)
    }, A.prototype.createPattern = function(t, e) {
      return this._context.createPattern(t, e)
    }, A.prototype.createRadialGradient = function(t, e, i, n, r, o) {
      return this._context.createRadialGradient(t, e, i, n, r, o)
    }, A.prototype.drawImage = function(t, e, i, n, r, o, a, s, h) {
      var l = arguments,
        d = this._context;
      3 === l.length ? d.drawImage(t, e, i) : 5 === l.length ? d.drawImage(t, e, i, n, r) : 9 === l.length && d.drawImage(t, e, i, n, r, o, a, s, h)
    }, A.prototype.ellipse = function(t, e, i, n, r, o, a, s) {
      this._context.ellipse(t, e, i, n, r, o, a, s)
    }, A.prototype.isPointInPath = function(t, e) {
      return this._context.isPointInPath(t, e)
    }, A.prototype.fill = function() {
      this._context.fill()
    }, A.prototype.fillRect = function(t, e, i, n) {
      this._context.fillRect(t, e, i, n)
    }, A.prototype.strokeRect = function(t, e, i, n) {
      this._context.strokeRect(t, e, i, n)
    }, A.prototype.fillText = function(t, e, i) {
      this._context.fillText(t, e, i)
    }, A.prototype.measureText = function(t) {
      return this._context.measureText(t)
    }, A.prototype.getImageData = function(t, e, i, n) {
      return this._context.getImageData(t, e, i, n)
    }, A.prototype.lineTo = function(t, e) {
      this._context.lineTo(t, e)
    }, A.prototype.moveTo = function(t, e) {
      this._context.moveTo(t, e)
    }, A.prototype.rect = function(t, e, i, n) {
      this._context.rect(t, e, i, n)
    }, A.prototype.putImageData = function(t, e, i) {
      this._context.putImageData(t, e, i)
    }, A.prototype.quadraticCurveTo = function(t, e, i, n) {
      this._context.quadraticCurveTo(t, e, i, n)
    }, A.prototype.restore = function() {
      this._context.restore()
    }, A.prototype.rotate = function(t) {
      this._context.rotate(t)
    }, A.prototype.save = function() {
      this._context.save()
    }, A.prototype.scale = function(t, e) {
      this._context.scale(t, e)
    }, A.prototype.setLineDash = function(t) {
      this._context.setLineDash ? this._context.setLineDash(t) : "mozDash" in this._context ? this._context.mozDash = t : "webkitLineDash" in this._context && (this._context.webkitLineDash = t)
    }, A.prototype.getLineDash = function() {
      return this._context.getLineDash()
    }, A.prototype.setTransform = function(t, e, i, n, r, o) {
      this._context.setTransform(t, e, i, n, r, o)
    }, A.prototype.stroke = function() {
      this._context.stroke()
    }, A.prototype.strokeText = function(t, e, i, n) {
      this._context.strokeText(t, e, i, n)
    }, A.prototype.transform = function(t, e, i, n, r, o) {
      this._context.transform(t, e, i, n, r, o)
    }, A.prototype.translate = function(t, e) {
      this._context.translate(t, e)
    }, A.prototype._enableTrace = function() {
      function t(t) {
        var e, i = r[t];
        r[t] = function() {
          return n = o(Array.prototype.slice.call(arguments, 0)), e = i.apply(r, arguments), r._trace({
            method: t,
            args: n
          }), e
        }
      }
      var e, n, r = this,
        i = k.length,
        o = L._simplifyArray,
        a = this.setAttr;
      for (e = 0; e < i; e++) t(k[e]);
      r.setAttr = function() {
        a.apply(r, arguments);
        var t = arguments[0],
          e = arguments[1];
        "shadowOffsetX" !== t && "shadowOffsetY" !== t && "shadowBlur" !== t || (e /= this.canvas.getPixelRatio()), r._trace({
          property: t,
          val: e
        })
      }
    }, A.prototype._applyGlobalCompositeOperation = function(t) {
      var e = t.getGlobalCompositeOperation();
      "source-over" !== e && this.setAttr("globalCompositeOperation", e)
    }, A);

  function A(t) {
    this.canvas = t, this._context = t._canvas.getContext("2d"), O.enableTrace && (this.traceArr = [], this._enableTrace())
  } ["fillStyle", "strokeStyle", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY", "lineCap", "lineDashOffset", "lineJoin", "lineWidth", "miterLimit", "font", "textAlign", "textBaseline", "globalAlpha", "globalCompositeOperation", "imageSmoothingEnabled"].forEach(function(e) {
    Object.defineProperty(T.prototype, e, {
      get: function() {
        return this._context[e]
      },
      set: function(t) {
        this._context[e] = t
      }
    })
  });
  var M, G = (P(R, M = T), R.prototype._fillColor = function(t) {
    var e = t.fill();
    this.setAttr("fillStyle", e), t._fillFunc(this)
  }, R.prototype._fillPattern = function(t) {
    var e = t.getFillPatternX(),
      i = t.getFillPatternY(),
      n = O.getAngle(t.getFillPatternRotation()),
      r = t.getFillPatternOffsetX(),
      o = t.getFillPatternOffsetY(),
      a = t.getFillPatternScaleX(),
      s = t.getFillPatternScaleY();
    (e || i) && this.translate(e || 0, i || 0), n && this.rotate(n), (a || s) && this.scale(a, s), (r || o) && this.translate(-1 * r, -1 * o), this.setAttr("fillStyle", t._getFillPattern()), t._fillFunc(this)
  }, R.prototype._fillLinearGradient = function(t) {
    var e = t._getLinearGradient();
    e && (this.setAttr("fillStyle", e), t._fillFunc(this))
  }, R.prototype._fillRadialGradient = function(t) {
    var e = t._getRadialGradient();
    e && (this.setAttr("fillStyle", e), t._fillFunc(this))
  }, R.prototype._fill = function(t) {
    var e = t.fill(),
      i = t.getFillPriority();
    if (e && "color" === i) this._fillColor(t);
    else {
      var n = t.getFillPatternImage();
      if (n && "pattern" === i) this._fillPattern(t);
      else {
        var r = t.getFillLinearGradientColorStops();
        if (r && "linear-gradient" === i) this._fillLinearGradient(t);
        else {
          var o = t.getFillRadialGradientColorStops();
          o && "radial-gradient" === i ? this._fillRadialGradient(t) : e ? this._fillColor(t) : n ? this._fillPattern(t) : r ? this._fillLinearGradient(t) : o && this._fillRadialGradient(t)
        }
      }
    }
  }, R.prototype._strokeLinearGradient = function(t) {
    var e = t.getStrokeLinearGradientStartPoint(),
      i = t.getStrokeLinearGradientEndPoint(),
      n = t.getStrokeLinearGradientColorStops(),
      r = this.createLinearGradient(e.x, e.y, i.x, i.y);
    if (n) {
      for (var o = 0; o < n.length; o += 2) r.addColorStop(n[o], n[o + 1]);
      this.setAttr("strokeStyle", r)
    }
  }, R.prototype._stroke = function(t) {
    var e = t.dash(),
      i = t.getStrokeScaleEnabled();
    if (t.hasStroke()) {
      if (!i) {
        this.save();
        var n = this.getCanvas().getPixelRatio();
        this.setTransform(n, 0, 0, n, 0, 0)
      }
      this._applyLineCap(t), e && t.dashEnabled() && (this.setLineDash(e), this.setAttr("lineDashOffset", t.dashOffset())), this.setAttr("lineWidth", t.strokeWidth()), t.getShadowForStrokeEnabled() || this.setAttr("shadowColor", "rgba(0,0,0,0)"), t.getStrokeLinearGradientColorStops() ? this._strokeLinearGradient(t) : this.setAttr("strokeStyle", t.stroke()), t._strokeFunc(this), i || this.restore()
    }
  }, R.prototype._applyShadow = function(t) {
    var e = L,
      i = e.get(t.getShadowRGBA(), "black"),
      n = e.get(t.getShadowBlur(), 5),
      r = e.get(t.getShadowOffset(), {
        x: 0,
        y: 0
      }),
      o = t.getAbsoluteScale(),
      a = this.canvas.getPixelRatio(),
      s = o.x * a,
      h = o.y * a;
    this.setAttr("shadowColor", i), this.setAttr("shadowBlur", n * Math.min(Math.abs(s), Math.abs(h))), this.setAttr("shadowOffsetX", r.x * s), this.setAttr("shadowOffsetY", r.y * h)
  }, R);

  function R() {
    return null !== M && M.apply(this, arguments) || this
  }
  var I, E, D = (P(F, I = T), F.prototype._fill = function(t) {
    this.save(), this.setAttr("fillStyle", t.colorKey), t._fillFuncHit(this), this.restore()
  }, F.prototype.strokeShape = function(t) {
    t.hasHitStroke() && this._stroke(t)
  }, F.prototype._stroke = function(t) {
    if (t.hasHitStroke()) {
      var e = t.getStrokeScaleEnabled();
      if (!e) {
        this.save();
        var i = this.getCanvas().getPixelRatio();
        this.setTransform(i, 0, 0, i, 0, 0)
      }
      this._applyLineCap(t);
      var n = t.hitStrokeWidth(),
        r = "auto" === n ? t.strokeWidth() : n;
      this.setAttr("lineWidth", r), this.setAttr("strokeStyle", t.colorKey), t._strokeFuncHit(this), e || this.restore()
    }
  }, F);

  function F() {
    return null !== I && I.apply(this, arguments) || this
  }
  var B = (z.prototype.getContext = function() {
    return this.context
  }, z.prototype.getPixelRatio = function() {
    return this.pixelRatio
  }, z.prototype.setPixelRatio = function(t) {
    var e = this.pixelRatio;
    this.pixelRatio = t, this.setSize(this.getWidth() / e, this.getHeight() / e)
  }, z.prototype.setWidth = function(t) {
    this.width = this._canvas.width = t * this.pixelRatio, this._canvas.style.width = t + "px";
    var e = this.pixelRatio;
    this.getContext()._context.scale(e, e)
  }, z.prototype.setHeight = function(t) {
    this.height = this._canvas.height = t * this.pixelRatio, this._canvas.style.height = t + "px";
    var e = this.pixelRatio;
    this.getContext()._context.scale(e, e)
  }, z.prototype.getWidth = function() {
    return this.width
  }, z.prototype.getHeight = function() {
    return this.height
  }, z.prototype.setSize = function(t, e) {
    this.setWidth(t || 0), this.setHeight(e || 0)
  }, z.prototype.toDataURL = function(t, e) {
    try {
      return this._canvas.toDataURL(t, e)
    } catch (t) {
      try {
        return this._canvas.toDataURL()
      } catch (t) {
        return L.error("Unable to get data URL. " + t.message + " For more info read https://konvajs.org/docs/posts/Tainted_Canvas.html."), ""
      }
    }
  }, z);

  function z(t) {
    this.pixelRatio = 1, this.width = 0, this.height = 0, this.isCache = !1;
    var e = (t || {}).pixelRatio || O.pixelRatio || function() {
      if (E) return E;
      var t = L.createCanvasElement().getContext("2d");
      return E = (O._global.devicePixelRatio || 1) / (t.webkitBackingStorePixelRatio || t.mozBackingStorePixelRatio || t.msBackingStorePixelRatio || t.oBackingStorePixelRatio || t.backingStorePixelRatio || 1)
    }();
    this.pixelRatio = e, this._canvas = L.createCanvasElement(), this._canvas.style.padding = "0", this._canvas.style.margin = "0", this._canvas.style.border = "0", this._canvas.style.background = "transparent", this._canvas.style.position = "absolute", this._canvas.style.top = "0", this._canvas.style.left = "0"
  }
  w.addGetterSetter(B, "pixelRatio", void 0, y());
  var N, W = (P(H, N = B), H);

  function H(t) {
    void 0 === t && (t = {
      width: 0,
      height: 0
    });
    var e = N.call(this, t) || this;
    return e.context = new G(e), e.setSize(t.width, t.height), e
  }
  var Y, X = (P(j, Y = B), j);

  function j(t) {
    void 0 === t && (t = {
      width: 0,
      height: 0
    });
    var e = Y.call(this, t) || this;
    return e.hitCanvas = !0, e.context = new D(e), e.setSize(t.width, t.height), e
  }
  var U = {
    get isDragging() {
      var e = !1;
      return U._dragElements.forEach(function(t) {
        "dragging" === t.dragStatus && (e = !0)
      }), e
    },
    justDragged: !1,
    get node() {
      var e;
      return U._dragElements.forEach(function(t) {
        e = t.node
      }), e
    },
    _dragElements: new Map,
    _drag: function(a) {
      U._dragElements.forEach(function(e, t) {
        var i = e.node,
          n = i.getStage();
        n.setPointersPositions(a), void 0 === e.pointerId && (e.pointerId = L._getFirstPointerId(a));
        var r = n._changedPointerPositions.find(function(t) {
          return t.id === e.pointerId
        });
        if (r) {
          if ("dragging" !== e.dragStatus) {
            var o = i.dragDistance();
            if (Math.max(Math.abs(r.x - e.startPointerPos.x), Math.abs(r.y - e.startPointerPos.y)) < o) return;
            if (i.startDrag({
                evt: a
              }), !i.isDragging()) return
          }
          i._setDragPosition(a, e), i.fire("dragmove", {
            type: "dragmove",
            target: i,
            evt: a
          }, !0)
        }
      })
    },
    _endDragBefore: function(r) {
      U._dragElements.forEach(function(e, t) {
        var i = e.node.getStage();
        if (r && i.setPointersPositions(r), i._changedPointerPositions.find(function(t) {
            return t.id === e.pointerId
          })) {
          "dragging" !== e.dragStatus && "stopped" !== e.dragStatus || (U.justDragged = !0, O.listenClickTap = !1, e.dragStatus = "stopped");
          var n = e.node.getLayer() || e.node instanceof O.Stage && e.node;
          n && n.draw()
        }
      })
    },
    _endDragAfter: function(i) {
      U._dragElements.forEach(function(t, e) {
        "stopped" === t.dragStatus && t.node.fire("dragend", {
          type: "dragend",
          target: t.node,
          evt: i
        }, !0), "dragging" !== t.dragStatus && U._dragElements.delete(e)
      })
    }
  };
  O.isBrowser && (window.addEventListener("mouseup", U._endDragBefore, !0), window.addEventListener("touchend", U._endDragBefore, !0), window.addEventListener("mousemove", U._drag), window.addEventListener("touchmove", U._drag), window.addEventListener("mouseup", U._endDragAfter, !1), window.addEventListener("touchend", U._endDragAfter, !1));

  function q(t, e) {
    t && K[t] === e && delete K[t]
  }

  function V(t, e) {
    if (t) {
      var i = Q[t];
      if (i) {
        for (var n = 0; n < i.length; n++) {
          i[n]._id === e && i.splice(n, 1)
        }
        0 === i.length && delete Q[t]
      }
    }
  }
  var K = {},
    Q = {},
    J = "absoluteOpacity",
    Z = "absoluteTransform",
    $ = "absoluteScale",
    tt = "canvas",
    et = "listening",
    it = "mouseenter",
    nt = "mouseleave",
    rt = "transform",
    ot = "visible",
    at = ["xChange.konva", "yChange.konva", "scaleXChange.konva", "scaleYChange.konva", "skewXChange.konva", "skewYChange.konva", "rotationChange.konva", "offsetXChange.konva", "offsetYChange.konva", "transformsEnabledChange.konva"].join(" "),
    st = ["scaleXChange.konva", "scaleYChange.konva"].join(" "),
    ht = new o,
    lt = 1,
    dt = (ct.prototype.hasChildren = function() {
      return !1
    }, ct.prototype.getChildren = function() {
      return ht
    }, ct.prototype._clearCache = function(t) {
      t ? this._cache.delete(t) : this._cache.clear()
    }, ct.prototype._getCache = function(t, e) {
      var i = this._cache.get(t);
      return void 0 === i && (i = e.call(this), this._cache.set(t, i)), i
    }, ct.prototype._getCanvasCache = function() {
      return this._cache.get(tt)
    }, ct.prototype._clearSelfAndDescendantCache = function(e) {
      this._clearCache(e), this.isCached() || this.children && this.children.each(function(t) {
        t._clearSelfAndDescendantCache(e)
      })
    }, ct.prototype.clearCache = function() {
      return this._cache.delete(tt), this._clearSelfAndDescendantCache(), this
    }, ct.prototype.cache = function(t) {
      var e = t || {},
        i = {};
      void 0 !== e.x && void 0 !== e.y && void 0 !== e.width && void 0 !== e.height || (i = this.getClientRect({
        skipTransform: !0,
        relativeTo: this.getParent()
      }));
      var n = Math.ceil(e.width || i.width),
        r = Math.ceil(e.height || i.height),
        o = e.pixelRatio,
        a = void 0 === e.x ? i.x : e.x,
        s = void 0 === e.y ? i.y : e.y,
        h = e.offset || 0,
        l = e.drawBorder || !1;
      if (n && r) {
        a -= h, s -= h;
        var d = new W({
            pixelRatio: o,
            width: n += 2 * h,
            height: r += 2 * h
          }),
          c = new W({
            pixelRatio: o,
            width: n,
            height: r
          }),
          p = new X({
            pixelRatio: 1,
            width: n,
            height: r
          }),
          u = d.getContext(),
          f = p.getContext();
        return p.isCache = !0, this._cache.delete("canvas"), (this._filterUpToDate = !1) === e.imageSmoothingEnabled && (d.getContext()._context.imageSmoothingEnabled = !1, c.getContext()._context.imageSmoothingEnabled = !1, p.getContext()._context.imageSmoothingEnabled = !1), u.save(), f.save(), u.translate(-a, -s), f.translate(-a, -s), this._isUnderCache = !0, this._clearSelfAndDescendantCache(J), this._clearSelfAndDescendantCache($), this.drawScene(d, this, !0), this.drawHit(p, this, !0), this._isUnderCache = !1, u.restore(), f.restore(), l && (u.save(), u.beginPath(), u.rect(0, 0, n, r), u.closePath(), u.setAttr("strokeStyle", "red"), u.setAttr("lineWidth", 5), u.stroke(), u.restore()), this._cache.set(tt, {
          scene: d,
          filter: c,
          hit: p,
          x: a,
          y: s
        }), this
      }
      L.error("Can not cache the node. Width or height of the node equals 0. Caching is skipped.")
    }, ct.prototype.isCached = function() {
      return this._cache.has("canvas")
    }, ct.prototype.getClientRect = function(t) {
      throw new Error('abstract "getClientRect" method call')
    }, ct.prototype._transformedRect = function(t, e) {
      var i, n, r, o, a = [{
          x: t.x,
          y: t.y
        }, {
          x: t.x + t.width,
          y: t.y
        }, {
          x: t.x + t.width,
          y: t.y + t.height
        }, {
          x: t.x,
          y: t.y + t.height
        }],
        s = this.getAbsoluteTransform(e);
      return a.forEach(function(t) {
        var e = s.point(t);
        void 0 === i && (i = r = e.x, n = o = e.y), i = Math.min(i, e.x), n = Math.min(n, e.y), r = Math.max(r, e.x), o = Math.max(o, e.y)
      }), {
        x: i,
        y: n,
        width: r - i,
        height: o - n
      }
    }, ct.prototype._drawCachedSceneCanvas = function(t) {
      t.save(), t._applyOpacity(this), t._applyGlobalCompositeOperation(this);
      var e = this._getCanvasCache();
      t.translate(e.x, e.y);
      var i = this._getCachedSceneCanvas(),
        n = i.pixelRatio;
      t.drawImage(i._canvas, 0, 0, i.width / n, i.height / n), t.restore()
    }, ct.prototype._drawCachedHitCanvas = function(t) {
      var e = this._getCanvasCache(),
        i = e.hit;
      t.save(), t.translate(e.x, e.y), t.drawImage(i._canvas, 0, 0), t.restore()
    }, ct.prototype._getCachedSceneCanvas = function() {
      var t, e, i, n, r = this.filters(),
        o = this._getCanvasCache(),
        a = o.scene,
        s = o.filter,
        h = s.getContext();
      if (r) {
        if (!this._filterUpToDate) {
          var l = a.pixelRatio;
          try {
            for (t = r.length, h.clear(), h.drawImage(a._canvas, 0, 0, a.getWidth() / l, a.getHeight() / l), e = h.getImageData(0, 0, s.getWidth(), s.getHeight()), i = 0; i < t; i++) "function" == typeof(n = r[i]) ? (n.call(this, e), h.putImageData(e, 0, 0)) : L.error("Filter should be type of function, but got " + typeof n + " instead. Please check correct filters")
          } catch (t) {
            L.error("Unable to apply filter. " + t.message + " This post my help you https://konvajs.org/docs/posts/Tainted_Canvas.html.")
          }
          this._filterUpToDate = !0
        }
        return s
      }
      return a
    }, ct.prototype.on = function(t, e) {
      if (3 === arguments.length) return this._delegate.apply(this, arguments);
      var i, n, r, o, a = t.split(" "),
        s = a.length;
      for (i = 0; i < s; i++) r = (n = a[i].split("."))[0], o = n[1] || "", this.eventListeners[r] || (this.eventListeners[r] = []), this.eventListeners[r].push({
        name: o,
        handler: e
      });
      return this
    }, ct.prototype.off = function(t, e) {
      var i, n, r, o, a, s = (t || "").split(" "),
        h = s.length;
      if (!t)
        for (n in this.eventListeners) this._off(n);
      for (i = 0; i < h; i++)
        if (o = (r = s[i].split("."))[0], a = r[1], o) this.eventListeners[o] && this._off(o, a, e);
        else
          for (n in this.eventListeners) this._off(n, a, e);
      return this
    }, ct.prototype.dispatchEvent = function(t) {
      var e = {
        target: this,
        type: t.type,
        evt: t
      };
      return this.fire(t.type, e), this
    }, ct.prototype.addEventListener = function(t, e) {
      return this.on(t, function(t) {
        e.call(this, t.evt)
      }), this
    }, ct.prototype.removeEventListener = function(t) {
      return this.off(t), this
    }, ct.prototype._delegate = function(t, n, r) {
      var o = this;
      this.on(t, function(t) {
        for (var e = t.target.findAncestors(n, !0, o), i = 0; i < e.length; i++)(t = L.cloneObject(t)).currentTarget = e[i], r.call(e[i], t)
      })
    }, ct.prototype.remove = function() {
      return this.isDragging() && this.stopDrag(), U._dragElements.delete(this._id), this._remove(), this
    }, ct.prototype._clearCaches = function() {
      this._clearSelfAndDescendantCache(Z), this._clearSelfAndDescendantCache(J), this._clearSelfAndDescendantCache($), this._clearSelfAndDescendantCache("stage"), this._clearSelfAndDescendantCache(ot), this._clearSelfAndDescendantCache(et)
    }, ct.prototype._remove = function() {
      this._clearCaches();
      var t = this.getParent();
      t && t.children && (t.children.splice(this.index, 1), t._setChildrenIndices(), this.parent = null)
    }, ct.prototype.destroy = function() {
      q(this.id(), this);
      for (var t = (this.name() || "").split(/\s/g), e = 0; e < t.length; e++) {
        var i = t[e];
        V(i, this._id)
      }
      return this.remove(), this
    }, ct.prototype.getAttr = function(t) {
      var e = "get" + L._capitalize(t);
      return L._isFunction(this[e]) ? this[e]() : this.attrs[t]
    }, ct.prototype.getAncestors = function() {
      for (var t = this.getParent(), e = new o; t;) e.push(t), t = t.getParent();
      return e
    }, ct.prototype.getAttrs = function() {
      return this.attrs || {}
    }, ct.prototype.setAttrs = function(t) {
      var e, i;
      if (!t) return this;
      for (e in t) "children" !== e && (i = "set" + L._capitalize(e), L._isFunction(this[i]) ? this[i](t[e]) : this._setAttr(e, t[e]));
      return this
    }, ct.prototype.isListening = function() {
      return this._getCache(et, this._isListening)
    }, ct.prototype._isListening = function() {
      var t = this.listening(),
        e = this.getParent();
      return "inherit" === t ? !e || e.isListening() : t
    }, ct.prototype.isVisible = function() {
      return this._getCache(ot, this._isVisible)
    }, ct.prototype._isVisible = function(t) {
      var e = this.visible(),
        i = this.getParent();
      return "inherit" === e ? !i || i === t || i._isVisible(t) : t && t !== i ? e && i._isVisible(t) : e
    }, ct.prototype.shouldDrawHit = function() {
      var t = this.getLayer();
      return !t && this.isListening() && this.isVisible() || t && t.hitGraphEnabled() && this.isListening() && this.isVisible()
    }, ct.prototype.show = function() {
      return this.visible(!0), this
    }, ct.prototype.hide = function() {
      return this.visible(!1), this
    }, ct.prototype.getZIndex = function() {
      return this.index || 0
    }, ct.prototype.getAbsoluteZIndex = function() {
      var i, n, r, o, a = this.getDepth(),
        s = this,
        h = 0;
      return "Stage" !== s.nodeType && function t(e) {
        for (i = [], n = e.length, r = 0; r < n; r++) o = e[r], h++, "Shape" !== o.nodeType && (i = i.concat(o.getChildren().toArray())), o._id === s._id && (r = n);
        0 < i.length && i[0].getDepth() <= a && t(i)
      }(s.getStage().getChildren()), h
    }, ct.prototype.getDepth = function() {
      for (var t = 0, e = this.parent; e;) t++, e = e.parent;
      return t
    }, ct.prototype.setPosition = function(t) {
      return this.x(t.x), this.y(t.y), this
    }, ct.prototype.getPosition = function() {
      return {
        x: this.x(),
        y: this.y()
      }
    }, ct.prototype.getAbsolutePosition = function(t) {
      for (var e = !1, i = this.parent; i;) {
        if (i.isCached()) {
          e = !0;
          break
        }
        i = i.parent
      }
      e && !t && (t = !0);
      var n = this.getAbsoluteTransform(t).getMatrix(),
        r = new d,
        o = this.offset();
      return r.m = n.slice(), r.translate(o.x, o.y), r.getTranslation()
    }, ct.prototype.setAbsolutePosition = function(t) {
      var e, i = this._clearTransform();
      return this.attrs.x = i.x, this.attrs.y = i.y, delete i.x, delete i.y, (e = this.getAbsoluteTransform()).invert(), e.translate(t.x, t.y), t = {
        x: this.attrs.x + e.getTranslation().x,
        y: this.attrs.y + e.getTranslation().y
      }, this.setPosition({
        x: t.x,
        y: t.y
      }), this._setTransform(i), this
    }, ct.prototype._setTransform = function(t) {
      var e;
      for (e in t) this.attrs[e] = t[e];
      this._clearCache(rt), this._clearSelfAndDescendantCache(Z)
    }, ct.prototype._clearTransform = function() {
      var t = {
        x: this.x(),
        y: this.y(),
        rotation: this.rotation(),
        scaleX: this.scaleX(),
        scaleY: this.scaleY(),
        offsetX: this.offsetX(),
        offsetY: this.offsetY(),
        skewX: this.skewX(),
        skewY: this.skewY()
      };
      return this.attrs.x = 0, this.attrs.y = 0, this.attrs.rotation = 0, this.attrs.scaleX = 1, this.attrs.scaleY = 1, this.attrs.offsetX = 0, this.attrs.offsetY = 0, this.attrs.skewX = 0, this.attrs.skewY = 0, this._clearCache(rt), this._clearSelfAndDescendantCache(Z), t
    }, ct.prototype.move = function(t) {
      var e = t.x,
        i = t.y,
        n = this.x(),
        r = this.y();
      return void 0 !== e && (n += e), void 0 !== i && (r += i), this.setPosition({
        x: n,
        y: r
      }), this
    }, ct.prototype._eachAncestorReverse = function(t, e) {
      var i, n, r = [],
        o = this.getParent();
      if (e && e._id === this._id) t(this);
      else {
        for (r.unshift(this); o && (!e || o._id !== e._id);) r.unshift(o), o = o.parent;
        for (i = r.length, n = 0; n < i; n++) t(r[n])
      }
    }, ct.prototype.rotate = function(t) {
      return this.rotation(this.rotation() + t), this
    }, ct.prototype.moveToTop = function() {
      if (!this.parent) return L.warn("Node has no parent. moveToTop function is ignored."), !1;
      var t = this.index;
      return this.parent.children.splice(t, 1), this.parent.children.push(this), this.parent._setChildrenIndices(), !0
    }, ct.prototype.moveUp = function() {
      if (!this.parent) return L.warn("Node has no parent. moveUp function is ignored."), !1;
      var t = this.index;
      return t < this.parent.getChildren().length - 1 && (this.parent.children.splice(t, 1), this.parent.children.splice(t + 1, 0, this), this.parent._setChildrenIndices(), !0)
    }, ct.prototype.moveDown = function() {
      if (!this.parent) return L.warn("Node has no parent. moveDown function is ignored."), !1;
      var t = this.index;
      return 0 < t && (this.parent.children.splice(t, 1), this.parent.children.splice(t - 1, 0, this), this.parent._setChildrenIndices(), !0)
    }, ct.prototype.moveToBottom = function() {
      if (!this.parent) return L.warn("Node has no parent. moveToBottom function is ignored."), !1;
      var t = this.index;
      return 0 < t && (this.parent.children.splice(t, 1), this.parent.children.unshift(this), this.parent._setChildrenIndices(), !0)
    }, ct.prototype.setZIndex = function(t) {
      if (!this.parent) return L.warn("Node has no parent. zIndex parameter is ignored."), this;
      (t < 0 || t >= this.parent.children.length) && L.warn("Unexpected value " + t + " for zIndex property. zIndex is just index of a node in children of its parent. Expected value is from 0 to " + (this.parent.children.length - 1) + ".");
      var e = this.index;
      return this.parent.children.splice(e, 1), this.parent.children.splice(t, 0, this), this.parent._setChildrenIndices(), this
    }, ct.prototype.getAbsoluteOpacity = function() {
      return this._getCache(J, this._getAbsoluteOpacity)
    }, ct.prototype._getAbsoluteOpacity = function() {
      var t = this.opacity(),
        e = this.getParent();
      return e && !e._isUnderCache && (t *= e.getAbsoluteOpacity()), t
    }, ct.prototype.moveTo = function(t) {
      return this.getParent() !== t && (this._remove(), t.add(this)), this
    }, ct.prototype.toObject = function() {
      var t, e, i, n = {},
        r = this.getAttrs();
      for (t in n.attrs = {}, r) e = r[t], L.isObject(e) && !L._isPlainObject(e) && !L._isArray(e) || (i = "function" == typeof this[t] && this[t], delete r[t], (i ? i.call(this) : null) !== (r[t] = e) && (n.attrs[t] = e));
      return n.className = this.getClassName(), L._prepareToStringify(n)
    }, ct.prototype.toJSON = function() {
      return JSON.stringify(this.toObject())
    }, ct.prototype.getParent = function() {
      return this.parent
    }, ct.prototype.findAncestors = function(t, e, i) {
      var n = [];
      e && this._isMatch(t) && n.push(this);
      for (var r = this.parent; r;) {
        if (r === i) return n;
        r._isMatch(t) && n.push(r), r = r.parent
      }
      return n
    }, ct.prototype.isAncestorOf = function(t) {
      return !1
    }, ct.prototype.findAncestor = function(t, e, i) {
      return this.findAncestors(t, e, i)[0]
    }, ct.prototype._isMatch = function(t) {
      if (!t) return !1;
      if ("function" == typeof t) return t(this);
      var e, i, n = t.replace(/ /g, "").split(","),
        r = n.length;
      for (e = 0; e < r; e++)
        if (i = n[e], L.isValidSelector(i) || (L.warn('Selector "' + i + '" is invalid. Allowed selectors examples are "#foo", ".bar" or "Group".'), L.warn('If you have a custom shape with such className, please change it to start with upper letter like "Triangle".'), L.warn("Konva is awesome, right?")), "#" === i.charAt(0)) {
          if (this.id() === i.slice(1)) return !0
        } else if ("." === i.charAt(0)) {
        if (this.hasName(i.slice(1))) return !0
      } else if (this.className === i || this.nodeType === i) return !0;
      return !1
    }, ct.prototype.getLayer = function() {
      var t = this.getParent();
      return t ? t.getLayer() : null
    }, ct.prototype.getStage = function() {
      return this._getCache("stage", this._getStage)
    }, ct.prototype._getStage = function() {
      var t = this.getParent();
      return t ? t.getStage() : void 0
    }, ct.prototype.fire = function(t, e, i) {
      return (e = e || {}).target = e.target || this, i ? this._fireAndBubble(t, e) : this._fire(t, e), this
    }, ct.prototype.getAbsoluteTransform = function(t) {
      return t ? this._getAbsoluteTransform(t) : this._getCache(Z, this._getAbsoluteTransform)
    }, ct.prototype._getAbsoluteTransform = function(t) {
      var i;
      if (t) return i = new d, this._eachAncestorReverse(function(t) {
        var e = t.transformsEnabled();
        "all" === e ? i.multiply(t.getTransform()) : "position" === e && i.translate(t.x() - t.offsetX(), t.y() - t.offsetY())
      }, t), i;
      i = this.parent ? this.parent.getAbsoluteTransform().copy() : new d;
      var e = this.transformsEnabled();
      return "all" === e ? i.multiply(this.getTransform()) : "position" === e && i.translate(this.x() - this.offsetX(), this.y() - this.offsetY()), i
    }, ct.prototype.getAbsoluteScale = function(t) {
      return t ? this._getAbsoluteScale(t) : this._getCache($, this._getAbsoluteScale)
    }, ct.prototype._getAbsoluteScale = function(t) {
      for (var e = this; e;) e._isUnderCache && (t = e), e = e.getParent();
      var i = 1,
        n = 1;
      return this._eachAncestorReverse(function(t) {
        i *= t.scaleX(), n *= t.scaleY()
      }, t), {
        x: i,
        y: n
      }
    }, ct.prototype.getAbsoluteRotation = function() {
      for (var t = this, e = 0; t;) e += t.rotation(), t = t.getParent();
      return e
    }, ct.prototype.getTransform = function() {
      return this._getCache(rt, this._getTransform)
    }, ct.prototype._getTransform = function() {
      var t = new d,
        e = this.x(),
        i = this.y(),
        n = O.getAngle(this.rotation()),
        r = this.scaleX(),
        o = this.scaleY(),
        a = this.skewX(),
        s = this.skewY(),
        h = this.offsetX(),
        l = this.offsetY();
      return 0 === e && 0 === i || t.translate(e, i), 0 !== n && t.rotate(n), 0 === a && 0 === s || t.skew(a, s), 1 === r && 1 === o || t.scale(r, o), 0 === h && 0 === l || t.translate(-1 * h, -1 * l), t
    }, ct.prototype.clone = function(t) {
      var e, i, n, r, o, a = L.cloneObject(this.attrs);
      for (e in t) a[e] = t[e];
      var s = new this.constructor(a);
      for (e in this.eventListeners)
        for (n = (i = this.eventListeners[e]).length, r = 0; r < n; r++)(o = i[r]).name.indexOf("konva") < 0 && (s.eventListeners[e] || (s.eventListeners[e] = []), s.eventListeners[e].push(o));
      return s
    }, ct.prototype._toKonvaCanvas = function(t) {
      t = t || {};
      var e = this.getClientRect(),
        i = this.getStage(),
        n = void 0 !== t.x ? t.x : e.x,
        r = void 0 !== t.y ? t.y : e.y,
        o = t.pixelRatio || 1,
        a = new W({
          width: t.width || e.width || (i ? i.width() : 0),
          height: t.height || e.height || (i ? i.height() : 0),
          pixelRatio: o
        }),
        s = a.getContext();
      return s.save(), (n || r) && s.translate(-1 * n, -1 * r), this.drawScene(a), s.restore(), a
    }, ct.prototype.toCanvas = function(t) {
      return this._toKonvaCanvas(t)._canvas
    }, ct.prototype.toDataURL = function(t) {
      var e = (t = t || {}).mimeType || null,
        i = t.quality || null,
        n = this._toKonvaCanvas(t).toDataURL(e, i);
      return t.callback && t.callback(n), n
    }, ct.prototype.toImage = function(t) {
      if (!t || !t.callback) throw "callback required for toImage method config argument";
      var e = t.callback;
      delete t.callback, L._urlToImage(this.toDataURL(t), function(t) {
        e(t)
      })
    }, ct.prototype.setSize = function(t) {
      return this.width(t.width), this.height(t.height), this
    }, ct.prototype.getSize = function() {
      return {
        width: this.width(),
        height: this.height()
      }
    }, ct.prototype.getClassName = function() {
      return this.className || this.nodeType
    }, ct.prototype.getType = function() {
      return this.nodeType
    }, ct.prototype.getDragDistance = function() {
      return void 0 !== this.attrs.dragDistance ? this.attrs.dragDistance : this.parent ? this.parent.getDragDistance() : O.dragDistance
    }, ct.prototype._off = function(t, e, i) {
      var n, r, o, a = this.eventListeners[t];
      for (n = 0; n < a.length; n++)
        if (r = a[n].name, o = a[n].handler, !("konva" === r && "konva" !== e || e && r !== e || i && i !== o)) {
          if (a.splice(n, 1), 0 === a.length) {
            delete this.eventListeners[t];
            break
          }
          n--
        }
    }, ct.prototype._fireChangeEvent = function(t, e, i) {
      this._fire(t + "Change", {
        oldVal: e,
        newVal: i
      })
    }, ct.prototype.setId = function(t) {
      var e = this.id();
      return q(e, this),
        function(t, e) {
          e && (K[e] = t)
        }(this, t), this._setAttr("id", t), this
    }, ct.prototype.setName = function(t) {
      var e, i, n, r, o = (this.name() || "").split(/\s/g),
        a = (t || "").split(/\s/g);
      for (i = 0; i < o.length; i++) e = o[i], -1 === a.indexOf(e) && e && V(e, this._id);
      for (i = 0; i < a.length; i++) e = a[i], -1 === o.indexOf(e) && e && (n = this, (r = e) && (Q[r] || (Q[r] = []), Q[r].push(n)));
      return this._setAttr("name", t), this
    }, ct.prototype.addName = function(t) {
      if (!this.hasName(t)) {
        var e = this.name(),
          i = e ? e + " " + t : t;
        this.setName(i)
      }
      return this
    }, ct.prototype.hasName = function(t) {
      if (!t) return !1;
      var e = this.name();
      return !!e && -1 !== (e || "").split(/\s/g).indexOf(t)
    }, ct.prototype.removeName = function(t) {
      var e = (this.name() || "").split(/\s/g),
        i = e.indexOf(t);
      return -1 !== i && (e.splice(i, 1), this.setName(e.join(" "))), this
    }, ct.prototype.setAttr = function(t, e) {
      var i = this["set" + L._capitalize(t)];
      return L._isFunction(i) ? i.call(this, e) : this._setAttr(t, e), this
    }, ct.prototype._setAttr = function(t, e) {
      var i = this.attrs[t];
      i === e && !L.isObject(e) || (null == e ? delete this.attrs[t] : this.attrs[t] = e, this._fireChangeEvent(t, i, e))
    }, ct.prototype._setComponentAttr = function(t, e, i) {
      var n;
      void 0 !== i && ((n = this.attrs[t]) || (this.attrs[t] = this.getAttr(t)), this.attrs[t][e] = i, this._fireChangeEvent(t, n, i))
    }, ct.prototype._fireAndBubble = function(t, e, i) {
      if (e && "Shape" === this.nodeType && (e.target = this), t !== it && t !== nt || !(i && (this === i || this.isAncestorOf && this.isAncestorOf(i)) || "Stage" === this.nodeType && !i)) {
        this._fire(t, e);
        var n = (t === it || t === nt) && i && i.isAncestorOf && i.isAncestorOf(this) && !i.isAncestorOf(this.parent);
        (e && !e.cancelBubble || !e) && this.parent && this.parent.isListening() && !n && (i && i.parent ? this._fireAndBubble.call(this.parent, t, e, i) : this._fireAndBubble.call(this.parent, t, e))
      }
    }, ct.prototype._fire = function(t, e) {
      var i, n = this.eventListeners[t];
      if (n)
        for ((e = e || {}).currentTarget = this, e.type = t, i = 0; i < n.length; i++) n[i].handler.call(this, e)
    }, ct.prototype.draw = function() {
      return this.drawScene(), this.drawHit(), this
    }, ct.prototype._createDragElement = function(t) {
      var e = t ? t.pointerId : void 0,
        i = this.getStage(),
        n = this.getAbsolutePosition(),
        r = i._getPointerById(e) || i._changedPointerPositions[0] || n;
      U._dragElements.set(this._id, {
        node: this,
        startPointerPos: r,
        offset: {
          x: r.x - n.x,
          y: r.y - n.y
        },
        dragStatus: "ready",
        pointerId: e
      })
    }, ct.prototype.startDrag = function(t) {
      U._dragElements.has(this._id) || this._createDragElement(t), U._dragElements.get(this._id).dragStatus = "dragging", this.fire("dragstart", {
        type: "dragstart",
        target: this,
        evt: t && t.evt
      }, !0)
    }, ct.prototype._setDragPosition = function(t, e) {
      var i = this.getStage()._getPointerById(e.pointerId);
      if (i) {
        var n = {
            x: i.x - e.offset.x,
            y: i.y - e.offset.y
          },
          r = this.dragBoundFunc();
        if (void 0 !== r) {
          var o = r.call(this, n, t);
          o ? n = o : L.warn("dragBoundFunc did not return any value. That is unexpected behavior. You must return new absolute position from dragBoundFunc.")
        }
        this._lastPos && this._lastPos.x === n.x && this._lastPos.y === n.y || (this.setAbsolutePosition(n), this.getLayer() ? this.getLayer().batchDraw() : this.getStage() && this.getStage().batchDraw()), this._lastPos = n
      }
    }, ct.prototype.stopDrag = function(t) {
      var e = U._dragElements.get(this._id);
      e && (e.dragStatus = "stopped"), U._endDragBefore(t), U._endDragAfter(t)
    }, ct.prototype.setDraggable = function(t) {
      this._setAttr("draggable", t), this._dragChange()
    }, ct.prototype.isDragging = function() {
      var t = U._dragElements.get(this._id);
      return !!t && "dragging" === t.dragStatus
    }, ct.prototype._listenDrag = function() {
      this._dragCleanup(), this.on("mousedown.konva touchstart.konva", function(t) {
        var e = this;
        if ((void 0 === t.evt.button || 0 <= O.dragButtons.indexOf(t.evt.button)) && !this.isDragging()) {
          var i = !1;
          U._dragElements.forEach(function(t) {
            e.isAncestorOf(t.node) && (i = !0)
          }), i || this._createDragElement(t)
        }
      })
    }, ct.prototype._dragChange = function() {
      this.attrs.draggable ? this._listenDrag() : (this._dragCleanup(), this.getStage() && U._dragElements.has(this._id) && this.stopDrag())
    }, ct.prototype._dragCleanup = function() {
      this.off("mousedown.konva"), this.off("touchstart.konva")
    }, ct.create = function(t, e) {
      return L._isString(t) && (t = JSON.parse(t)), this._createNode(t, e)
    }, ct._createNode = function(t, e) {
      var i, n, r, o = ct.prototype.getClassName.call(t),
        a = t.children;
      if (e && (t.attrs.container = e), s[o] || (L.warn('Can not find a node with class name "' + o + '". Fallback to "Shape".'), o = "Shape"), i = new s[o](t.attrs), a)
        for (n = a.length, r = 0; r < n; r++) i.add(ct._createNode(a[r]));
      return i
    }, ct);

  function ct(t) {
    var e = this;
    this._id = lt++, this.eventListeners = {}, this.attrs = {}, this.index = 0, this.parent = null, this._cache = new Map, this._lastPos = null, this._filterUpToDate = !1, this._isUnderCache = !1, this.children = ht, this._dragEventId = null, this.setAttrs(t), this.on(at, function() {
      e._clearCache(rt), e._clearSelfAndDescendantCache(Z)
    }), this.on(st, function() {
      e._clearSelfAndDescendantCache($)
    }), this.on("visibleChange.konva", function() {
      e._clearSelfAndDescendantCache(ot)
    }), this.on("listeningChange.konva", function() {
      e._clearSelfAndDescendantCache(et)
    }), this.on("opacityChange.konva", function() {
      e._clearSelfAndDescendantCache(J)
    })
  }
  dt.prototype.nodeType = "Node", dt.prototype._attrsAffectingSize = [], w.addGetterSetter(dt, "zIndex"), w.addGetterSetter(dt, "absolutePosition"), w.addGetterSetter(dt, "position"), w.addGetterSetter(dt, "x", 0, y()), w.addGetterSetter(dt, "y", 0, y()), w.addGetterSetter(dt, "globalCompositeOperation", "source-over", _()), w.addGetterSetter(dt, "opacity", 1, y()), w.addGetterSetter(dt, "name", "", _()), w.addGetterSetter(dt, "id", "", _()), w.addGetterSetter(dt, "rotation", 0, y()), w.addComponentsGetterSetter(dt, "scale", ["x", "y"]), w.addGetterSetter(dt, "scaleX", 1, y()), w.addGetterSetter(dt, "scaleY", 1, y()), w.addComponentsGetterSetter(dt, "skew", ["x", "y"]), w.addGetterSetter(dt, "skewX", 0, y()), w.addGetterSetter(dt, "skewY", 0, y()), w.addComponentsGetterSetter(dt, "offset", ["x", "y"]), w.addGetterSetter(dt, "offsetX", 0, y()), w.addGetterSetter(dt, "offsetY", 0, y()), w.addGetterSetter(dt, "dragDistance", null, y()), w.addGetterSetter(dt, "width", 0, y()), w.addGetterSetter(dt, "height", 0, y()), w.addGetterSetter(dt, "listening", "inherit", function(t) {
    return !0 === t || !1 === t || "inherit" === t || L.warn(t + ' is a not valid value for "listening" attribute. The value may be true, false or "inherit".'), t
  }), w.addGetterSetter(dt, "preventDefault", !0, S()), w.addGetterSetter(dt, "filters", null, function(t) {
    return this._filterUpToDate = !1, t
  }), w.addGetterSetter(dt, "visible", "inherit", function(t) {
    return !0 === t || !1 === t || "inherit" === t || L.warn(t + ' is a not valid value for "visible" attribute. The value may be true, false or "inherit".'), t
  }), w.addGetterSetter(dt, "transformsEnabled", "all", _()), w.addGetterSetter(dt, "size"), w.addGetterSetter(dt, "dragBoundFunc"), w.addGetterSetter(dt, "draggable", !1, S()), w.backCompat(dt, {
    rotateDeg: "rotate",
    setRotationDeg: "setRotation",
    getRotationDeg: "getRotation"
  }), o.mapMethods(dt);
  var pt, ut = (P(ft, pt = dt), ft.prototype.getChildren = function(e) {
    if (!e) return this.children;
    var i = new o;
    return this.children.each(function(t) {
      e(t) && i.push(t)
    }), i
  }, ft.prototype.hasChildren = function() {
    return 0 < this.getChildren().length
  }, ft.prototype.removeChildren = function() {
    for (var t, e = 0; e < this.children.length; e++)(t = this.children[e]).parent = null, t.index = 0, t.remove();
    return this.children = new o, this
  }, ft.prototype.destroyChildren = function() {
    for (var t, e = 0; e < this.children.length; e++)(t = this.children[e]).parent = null, t.index = 0, t.destroy();
    return this.children = new o, this
  }, ft.prototype.add = function() {
    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
    if (1 < arguments.length) {
      for (var i = 0; i < arguments.length; i++) this.add(arguments[i]);
      return this
    }
    var n = t[0];
    if (n.getParent()) return n.moveTo(this), this;
    var r = this.children;
    return this._validateAdd(n), n._clearCaches(), n.index = r.length, n.parent = this, r.push(n), this._fire("add", {
      child: n
    }), this
  }, ft.prototype.destroy = function() {
    return this.hasChildren() && this.destroyChildren(), pt.prototype.destroy.call(this), this
  }, ft.prototype.find = function(t) {
    return this._generalFind(t, !1)
  }, ft.prototype.get = function(t) {
    return L.warn("collection.get() method is deprecated. Please use collection.find() instead."), this.find(t)
  }, ft.prototype.findOne = function(t) {
    var e = this._generalFind(t, !0);
    return 0 < e.length ? e[0] : void 0
  }, ft.prototype._generalFind = function(i, n) {
    var r = [];
    return this._descendants(function(t) {
      var e = t._isMatch(i);
      return e && r.push(t), !(!e || !n)
    }), o.toCollection(r)
  }, ft.prototype._descendants = function(t) {
    for (var e = 0; e < this.children.length; e++) {
      var i = this.children[e];
      if (t(i)) return !0;
      if (i.hasChildren() && i._descendants(t)) return !0
    }
    return !1
  }, ft.prototype.toObject = function() {
    var t = dt.prototype.toObject.call(this);
    t.children = [];
    for (var e = this.getChildren(), i = e.length, n = 0; n < i; n++) {
      var r = e[n];
      t.children.push(r.toObject())
    }
    return t
  }, ft.prototype._getDescendants = function(t) {
    for (var e = [], i = t.length, n = 0; n < i; n++) {
      var r = t[n];
      this.isAncestorOf(r) && e.push(r)
    }
    return e
  }, ft.prototype.isAncestorOf = function(t) {
    for (var e = t.getParent(); e;) {
      if (e._id === this._id) return !0;
      e = e.getParent()
    }
    return !1
  }, ft.prototype.clone = function(t) {
    var e = dt.prototype.clone.call(this, t);
    return this.getChildren().each(function(t) {
      e.add(t.clone())
    }), e
  }, ft.prototype.getAllIntersections = function(e) {
    var i = [];
    return this.find("Shape").each(function(t) {
      t.isVisible() && t.intersects(e) && i.push(t)
    }), i
  }, ft.prototype._setChildrenIndices = function() {
    this.children.each(function(t, e) {
      t.index = e
    })
  }, ft.prototype.drawScene = function(t, e, i) {
    var n = this.getLayer(),
      r = t || n && n.getCanvas(),
      o = r && r.getContext(),
      a = this._getCanvasCache(),
      s = a && a.scene;
    return (this.isVisible() || i) && (!i && s ? (o.save(), n._applyTransform(this, o, e), this._drawCachedSceneCanvas(o), o.restore()) : this._drawChildren(r, "drawScene", e, !1, i, i)), this
  }, ft.prototype.drawHit = function(t, e, i) {
    var n = this.getLayer(),
      r = t || n && n.hitCanvas,
      o = r && r.getContext(),
      a = this._getCanvasCache(),
      s = a && a.hit;
    return (this.shouldDrawHit(r) || i) && (!i && s ? (o.save(), n._applyTransform(this, o, e), this._drawCachedHitCanvas(o), o.restore()) : this._drawChildren(r, "drawHit", e, !1, i, i)), this
  }, ft.prototype._drawChildren = function(e, i, n, r, o, t) {
    var a, s, h = this.getLayer(),
      l = e && e.getContext(),
      d = this.clipWidth(),
      c = this.clipHeight(),
      p = this.clipFunc(),
      u = d && c || p;
    if (u && h) {
      l.save();
      var f = this.getAbsoluteTransform(n),
        g = f.getMatrix();
      l.transform(g[0], g[1], g[2], g[3], g[4], g[5]), l.beginPath(), p ? p.call(this, l, this) : (a = this.clipX(), s = this.clipY(), l.rect(a, s, d, c)), l.clip(), g = f.copy().invert().getMatrix(), l.transform(g[0], g[1], g[2], g[3], g[4], g[5])
    }
    var v = "source-over" !== this.globalCompositeOperation() && !t && "drawScene" === i;
    v && h && (l.save(), l._applyGlobalCompositeOperation(this)), this.children.each(function(t) {
      t[i](e, n, r, o)
    }), v && h && l.restore(), u && h && l.restore()
  }, ft.prototype.shouldDrawHit = function(t) {
    if (t && t.isCache) return !0;
    var e = this.getLayer(),
      i = !1;
    U._dragElements.forEach(function(t) {
      "dragging" === t.dragStatus && t.node.getLayer() === e && (i = !0)
    });
    var n = !O.hitOnDragEnabled && i;
    return e && e.hitGraphEnabled() && this.isVisible() && !n
  }, ft.prototype.getClientRect = function(i) {
    var n, r, o, a, t = (i = i || {}).skipTransform,
      e = i.relativeTo,
      s = {
        x: 1 / 0,
        y: 1 / 0,
        width: 0,
        height: 0
      },
      h = this;
    this.children.each(function(t) {
      if (t.visible()) {
        var e = t.getClientRect({
          relativeTo: h,
          skipShadow: i.skipShadow,
          skipStroke: i.skipStroke
        });
        0 === e.width && 0 === e.height || (a = void 0 === n ? (n = e.x, r = e.y, o = e.x + e.width, e.y + e.height) : (n = Math.min(n, e.x), r = Math.min(r, e.y), o = Math.max(o, e.x + e.width), Math.max(a, e.y + e.height)))
      }
    });
    for (var l = this.find("Shape"), d = !1, c = 0; c < l.length; c++)
      if (l[c]._isVisible(this)) {
        d = !0;
        break
      } return s = d && void 0 !== n ? {
      x: n,
      y: r,
      width: o - n,
      height: a - r
    } : {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    }, t ? s : this._transformedRect(s, e)
  }, ft);

  function ft() {
    var t = null !== pt && pt.apply(this, arguments) || this;
    return t.children = new o, t
  }
  w.addComponentsGetterSetter(ut, "clip", ["x", "y", "width", "height"]), w.addGetterSetter(ut, "clipX", void 0, y()), w.addGetterSetter(ut, "clipY", void 0, y()), w.addGetterSetter(ut, "clipWidth", void 0, y()), w.addGetterSetter(ut, "clipHeight", void 0, y()), w.addGetterSetter(ut, "clipFunc"), o.mapMethods(ut);
  var gt = new Map,
    vt = void 0 !== O._global.PointerEvent;

  function yt(t) {
    return gt.get(t)
  }

  function mt(t) {
    return {
      evt: t,
      pointerId: t.pointerId
    }
  }

  function _t(t, e) {
    return gt.get(t) === e
  }

  function St(t, e) {
    bt(t), e.getStage() && (gt.set(t, e), vt && e._fire("gotpointercapture", mt(new PointerEvent("gotpointercapture"))))
  }

  function bt(t) {
    var e = gt.get(t);
    if (e) {
      var i = e.getStage();
      i && i.content, gt.delete(t), vt && e._fire("lostpointercapture", mt(new PointerEvent("lostpointercapture")))
    }
  }
  var xt = "mouseout",
    wt = "mouseleave",
    Ct = "mouseover",
    Pt = "mouseenter",
    kt = "mousemove",
    Tt = "mousedown",
    At = "mouseup",
    Mt = "pointermove",
    Gt = "pointerdown",
    Rt = "pointerup",
    Ot = "contextmenu",
    Lt = "dblclick",
    It = "touchstart",
    Et = "touchend",
    Dt = "touchmove",
    Ft = "wheel",
    Bt = "_",
    zt = [Pt, Tt, kt, At, xt, It, Dt, Et, Ct, Ft, Ot, Gt, Mt, Rt, "pointercancel", "lostpointercapture"],
    Nt = zt.length;

  function Wt(e, i) {
    e.content.addEventListener(i, function(t) {
      e[Bt + i](t)
    }, !1)
  }
  var Ht = [];

  function Yt(t) {
    return void 0 === t && (t = {}), (t.clipFunc || t.clipWidth || t.clipHeight) && L.warn("Stage does not support clipping. Please use clip for Layers or Groups."), t
  }
  var Xt, jt = (P(Ut, Xt = ut), Ut.prototype._validateAdd = function(t) {
    var e = "Layer" === t.getType(),
      i = "FastLayer" === t.getType();
    e || i || L.throw("You may only add layers to the stage.")
  }, Ut.prototype._checkVisibility = function() {
    if (this.content) {
      var t = this.visible() ? "" : "none";
      this.content.style.display = t
    }
  }, Ut.prototype.setContainer = function(t) {
    if ("string" == typeof t) {
      if ("." === t.charAt(0)) {
        var e = t.slice(1);
        t = document.getElementsByClassName(e)[0]
      } else {
        var i;
        i = "#" !== t.charAt(0) ? t : t.slice(1), t = document.getElementById(i)
      }
      if (!t) throw "Can not find container in document with id " + i
    }
    return this._setAttr("container", t), this.content && (this.content.parentElement && this.content.parentElement.removeChild(this.content), t.appendChild(this.content)), this
  }, Ut.prototype.shouldDrawHit = function() {
    return !0
  }, Ut.prototype.clear = function() {
    var t, e = this.children,
      i = e.length;
    for (t = 0; t < i; t++) e[t].clear();
    return this
  }, Ut.prototype.clone = function(t) {
    return (t = t || {}).container = document.createElement("div"), ut.prototype.clone.call(this, t)
  }, Ut.prototype.destroy = function() {
    Xt.prototype.destroy.call(this);
    var t = this.content;
    t && L._isInDocument(t) && this.container().removeChild(t);
    var e = Ht.indexOf(this);
    return -1 < e && Ht.splice(e, 1), this
  }, Ut.prototype.getPointerPosition = function() {
    var t = this._pointerPositions[0] || this._changedPointerPositions[0];
    return t ? {
      x: t.x,
      y: t.y
    } : (L.warn("Pointer position is missing and not registered by the stage. Looks like it is outside of the stage container. You can set it manually from event: stage.setPointersPositions(event);"), null)
  }, Ut.prototype._getPointerById = function(e) {
    return this._pointerPositions.find(function(t) {
      return t.id === e
    })
  }, Ut.prototype.getPointersPositions = function() {
    return this._pointerPositions
  }, Ut.prototype.getStage = function() {
    return this
  }, Ut.prototype.getContent = function() {
    return this.content
  }, Ut.prototype._toKonvaCanvas = function(i) {
    var n = (i = i || {}).x || 0,
      r = i.y || 0,
      t = new W({
        width: i.width || this.width(),
        height: i.height || this.height(),
        pixelRatio: i.pixelRatio || 1
      }),
      o = t.getContext()._context,
      e = this.children;
    return (n || r) && o.translate(-1 * n, -1 * r), e.each(function(t) {
      if (t.isVisible()) {
        var e = t._toKonvaCanvas(i);
        o.drawImage(e._canvas, n, r, e.getWidth() / e.getPixelRatio(), e.getHeight() / e.getPixelRatio())
      }
    }), t
  }, Ut.prototype.getIntersection = function(t, e) {
    if (!t) return null;
    var i, n, r = this.children;
    for (i = r.length - 1; 0 <= i; i--)
      if (n = r[i].getIntersection(t, e)) return n;
    return null
  }, Ut.prototype._resizeDOM = function() {
    var e = this.width(),
      i = this.height();
    this.content && (this.content.style.width = e + "px", this.content.style.height = i + "px"), this.bufferCanvas.setSize(e, i), this.bufferHitCanvas.setSize(e, i), this.children.each(function(t) {
      t.setSize({
        width: e,
        height: i
      }), t.draw()
    })
  }, Ut.prototype.add = function(t) {
    if (1 < arguments.length) {
      for (var e = 0; e < arguments.length; e++) this.add(arguments[e]);
      return this
    }
    Xt.prototype.add.call(this, t);
    var i = this.children.length;
    return 5 < i && L.warn("The stage has " + i + " layers. Recommended maximum number of layers is 3-5. Adding more layers into the stage may drop the performance. Rethink your tree structure, you can use Konva.Group."), t._setCanvasSize(this.width(), this.height()), t.draw(), O.isBrowser && this.content.appendChild(t.canvas._canvas), this
  }, Ut.prototype.getParent = function() {
    return null
  }, Ut.prototype.getLayer = function() {
    return null
  }, Ut.prototype.hasPointerCapture = function(t) {
    return _t(t, this)
  }, Ut.prototype.setPointerCapture = function(t) {
    St(t, this)
  }, Ut.prototype.releaseCapture = function(t) {
    bt(t)
  }, Ut.prototype.getLayers = function() {
    return this.getChildren()
  }, Ut.prototype._bindContentEvents = function() {
    if (O.isBrowser)
      for (var t = 0; t < Nt; t++) Wt(this, zt[t])
  }, Ut.prototype._mouseenter = function(t) {
    this.setPointersPositions(t), this._fire(Pt, {
      evt: t,
      target: this,
      currentTarget: this
    })
  }, Ut.prototype._mouseover = function(t) {
    this.setPointersPositions(t), this._fire("contentMouseover", {
      evt: t
    }), this._fire(Ct, {
      evt: t,
      target: this,
      currentTarget: this
    })
  }, Ut.prototype._mouseout = function(t) {
    this.setPointersPositions(t);
    var e = this.targetShape,
      i = !U.isDragging || O.hitOnDragEnabled;
    e && i ? (e._fireAndBubble(xt, {
      evt: t
    }), e._fireAndBubble(wt, {
      evt: t
    }), this._fire(wt, {
      evt: t,
      target: this,
      currentTarget: this
    }), this.targetShape = null) : i && (this._fire(wt, {
      evt: t,
      target: this,
      currentTarget: this
    }), this._fire(xt, {
      evt: t,
      target: this,
      currentTarget: this
    })), this.pointerPos = void 0, this._pointerPositions = [], this._fire("contentMouseout", {
      evt: t
    })
  }, Ut.prototype._mousemove = function(t) {
    if (O.UA.ieMobile) return this._touchmove(t);
    this.setPointersPositions(t);
    var e, i = L._getFirstPointerId(t),
      n = !U.isDragging || O.hitOnDragEnabled;
    if (n) {
      if ((e = this.getIntersection(this.getPointerPosition())) && e.isListening()) {
        var r = !this.targetShape || this.targetShape !== e;
        n && r ? (this.targetShape && (this.targetShape._fireAndBubble(xt, {
          evt: t,
          pointerId: i
        }, e), this.targetShape._fireAndBubble(wt, {
          evt: t,
          pointerId: i
        }, e)), e._fireAndBubble(Ct, {
          evt: t,
          pointerId: i
        }, this.targetShape), e._fireAndBubble(Pt, {
          evt: t,
          pointerId: i
        }, this.targetShape), e._fireAndBubble(kt, {
          evt: t,
          pointerId: i
        }), this.targetShape = e) : e._fireAndBubble(kt, {
          evt: t,
          pointerId: i
        })
      } else this.targetShape && n && (this.targetShape._fireAndBubble(xt, {
        evt: t,
        pointerId: i
      }), this.targetShape._fireAndBubble(wt, {
        evt: t,
        pointerId: i
      }), this._fire(Ct, {
        evt: t,
        target: this,
        currentTarget: this,
        pointerId: i
      }), this.targetShape = null), this._fire(kt, {
        evt: t,
        target: this,
        currentTarget: this,
        pointerId: i
      });
      this._fire("contentMousemove", {
        evt: t
      })
    }
    t.cancelable && t.preventDefault()
  }, Ut.prototype._mousedown = function(t) {
    if (O.UA.ieMobile) return this._touchstart(t);
    this.setPointersPositions(t);
    var e = L._getFirstPointerId(t),
      i = this.getIntersection(this.getPointerPosition());
    U.justDragged = !1, O.listenClickTap = !0, i && i.isListening() ? (this.clickStartShape = i)._fireAndBubble(Tt, {
      evt: t,
      pointerId: e
    }) : this._fire(Tt, {
      evt: t,
      target: this,
      currentTarget: this,
      pointerId: e
    }), this._fire("contentMousedown", {
      evt: t
    })
  }, Ut.prototype._mouseup = function(t) {
    if (O.UA.ieMobile) return this._touchend(t);
    this.setPointersPositions(t);
    var e = L._getFirstPointerId(t),
      i = this.getIntersection(this.getPointerPosition()),
      n = this.clickStartShape,
      r = this.clickEndShape,
      o = !1;
    O.inDblClickWindow ? (o = !0, clearTimeout(this.dblTimeout)) : U.justDragged || (O.inDblClickWindow = !0, clearTimeout(this.dblTimeout)), this.dblTimeout = setTimeout(function() {
      O.inDblClickWindow = !1
    }, O.dblClickWindow), i && i.isListening() ? ((this.clickEndShape = i)._fireAndBubble(At, {
      evt: t,
      pointerId: e
    }), O.listenClickTap && n && n._id === i._id && (i._fireAndBubble("click", {
      evt: t,
      pointerId: e
    }), o && r && r === i && i._fireAndBubble(Lt, {
      evt: t,
      pointerId: e
    }))) : (this._fire(At, {
      evt: t,
      target: this,
      currentTarget: this,
      pointerId: e
    }), O.listenClickTap && this._fire("click", {
      evt: t,
      target: this,
      currentTarget: this,
      pointerId: e
    }), o && this._fire(Lt, {
      evt: t,
      target: this,
      currentTarget: this,
      pointerId: e
    })), this._fire("contentMouseup", {
      evt: t
    }), O.listenClickTap && (this._fire("contentClick", {
      evt: t
    }), o && this._fire("contentDblclick", {
      evt: t
    })), O.listenClickTap = !1, t.cancelable && t.preventDefault()
  }, Ut.prototype._contextmenu = function(t) {
    this.setPointersPositions(t);
    var e = this.getIntersection(this.getPointerPosition());
    e && e.isListening() ? e._fireAndBubble(Ot, {
      evt: t
    }) : this._fire(Ot, {
      evt: t,
      target: this,
      currentTarget: this
    }), this._fire("contentContextmenu", {
      evt: t
    })
  }, Ut.prototype._touchstart = function(i) {
    var n = this;
    this.setPointersPositions(i);
    var r = !1;
    this._changedPointerPositions.forEach(function(t) {
      var e = n.getIntersection(t);
      O.listenClickTap = !0, U.justDragged = !1, e && e.isListening() && (O.captureTouchEventsEnabled && e.setPointerCapture(t.id), (n.tapStartShape = e)._fireAndBubble(It, {
        evt: i,
        pointerId: t.id
      }, n), r = !0, e.isListening() && e.preventDefault() && i.cancelable && i.preventDefault())
    }), r || this._fire(It, {
      evt: i,
      target: this,
      currentTarget: this,
      pointerId: this._changedPointerPositions[0].id
    }), this._fire("contentTouchstart", {
      evt: i
    })
  }, Ut.prototype._touchmove = function(i) {
    var n = this;
    if (this.setPointersPositions(i), !U.isDragging || O.hitOnDragEnabled) {
      var r = !1,
        o = {};
      this._changedPointerPositions.forEach(function(t) {
        var e = yt(t.id) || n.getIntersection(t);
        e && e.isListening() && (o[e._id] || (o[e._id] = !0, e._fireAndBubble(Dt, {
          evt: i,
          pointerId: t.id
        }), r = !0, e.isListening() && e.preventDefault() && i.cancelable && i.preventDefault()))
      }), r || this._fire(Dt, {
        evt: i,
        target: this,
        currentTarget: this,
        pointerId: this._changedPointerPositions[0].id
      }), this._fire("contentTouchmove", {
        evt: i
      })
    }
    U.isDragging && U.node.preventDefault() && i.cancelable && i.preventDefault()
  }, Ut.prototype._touchend = function(i) {
    var n = this;
    this.setPointersPositions(i);
    var r = this.clickEndShape,
      o = !1;
    O.inDblClickWindow ? (o = !0, clearTimeout(this.dblTimeout)) : U.justDragged || (O.inDblClickWindow = !0, clearTimeout(this.dblTimeout)), this.dblTimeout = setTimeout(function() {
      O.inDblClickWindow = !1
    }, O.dblClickWindow);
    var a = !1,
      s = {},
      h = !1,
      l = !1;
    this._changedPointerPositions.forEach(function(t) {
      var e = yt(t.id) || n.getIntersection(t);
      e && e.releaseCapture(t.id), e && e.isListening() && (s[e._id] || (s[e._id] = !0, (n.clickEndShape = e)._fireAndBubble(Et, {
        evt: i,
        pointerId: t.id
      }), a = !0, O.listenClickTap && e === n.tapStartShape && (h = !0, e._fireAndBubble("tap", {
        evt: i,
        pointerId: t.id
      }), o && r && r === e && (l = !0, e._fireAndBubble("dbltap", {
        evt: i,
        pointerId: t.id
      }))), e.isListening() && e.preventDefault() && i.cancelable && i.preventDefault()))
    }), a || this._fire(Et, {
      evt: i,
      target: this,
      currentTarget: this,
      pointerId: this._changedPointerPositions[0].id
    }), O.listenClickTap && !h && this._fire("tap", {
      evt: i,
      target: this,
      currentTarget: this,
      pointerId: this._changedPointerPositions[0].id
    }), o && !l && this._fire("dbltap", {
      evt: i,
      target: this,
      currentTarget: this,
      pointerId: this._changedPointerPositions[0].id
    }), this._fire("contentTouchend", {
      evt: i
    }), O.listenClickTap && (this._fire("contentTap", {
      evt: i
    }), o && this._fire("contentDbltap", {
      evt: i
    })), O.listenClickTap = !1
  }, Ut.prototype._wheel = function(t) {
    this.setPointersPositions(t);
    var e = this.getIntersection(this.getPointerPosition());
    e && e.isListening() ? e._fireAndBubble(Ft, {
      evt: t
    }) : this._fire(Ft, {
      evt: t,
      target: this,
      currentTarget: this
    }), this._fire("contentWheel", {
      evt: t
    })
  }, Ut.prototype._pointerdown = function(t) {
    if (O._pointerEventsEnabled) {
      this.setPointersPositions(t);
      var e = yt(t.pointerId) || this.getIntersection(this.getPointerPosition());
      e && e._fireAndBubble(Gt, mt(t))
    }
  }, Ut.prototype._pointermove = function(t) {
    if (O._pointerEventsEnabled) {
      this.setPointersPositions(t);
      var e = yt(t.pointerId) || this.getIntersection(this.getPointerPosition());
      e && e._fireAndBubble(Mt, mt(t))
    }
  }, Ut.prototype._pointerup = function(t) {
    if (O._pointerEventsEnabled) {
      this.setPointersPositions(t);
      var e = yt(t.pointerId) || this.getIntersection(this.getPointerPosition());
      e && e._fireAndBubble(Rt, mt(t)), bt(t.pointerId)
    }
  }, Ut.prototype._pointercancel = function(t) {
    if (O._pointerEventsEnabled) {
      this.setPointersPositions(t);
      var e = yt(t.pointerId) || this.getIntersection(this.getPointerPosition());
      e && e._fireAndBubble(Rt, mt(t)), bt(t.pointerId)
    }
  }, Ut.prototype._lostpointercapture = function(t) {
    bt(t.pointerId)
  }, Ut.prototype.setPointersPositions = function(t) {
    var e = this,
      i = this._getContentPosition(),
      n = null,
      r = null;
    void 0 !== (t = t || window.event).touches ? (this._pointerPositions = [], this._changedPointerPositions = [], o.prototype.each.call(t.touches, function(t) {
      e._pointerPositions.push({
        id: t.identifier,
        x: (t.clientX - i.left) / i.scaleX,
        y: (t.clientY - i.top) / i.scaleY
      })
    }), o.prototype.each.call(t.changedTouches || t.touches, function(t) {
      e._changedPointerPositions.push({
        id: t.identifier,
        x: (t.clientX - i.left) / i.scaleX,
        y: (t.clientY - i.top) / i.scaleY
      })
    })) : (n = (t.clientX - i.left) / i.scaleX, r = (t.clientY - i.top) / i.scaleY, this.pointerPos = {
      x: n,
      y: r
    }, this._pointerPositions = [{
      x: n,
      y: r,
      id: L._getFirstPointerId(t)
    }], this._changedPointerPositions = [{
      x: n,
      y: r,
      id: L._getFirstPointerId(t)
    }])
  }, Ut.prototype._setPointerPosition = function(t) {
    L.warn('Method _setPointerPosition is deprecated. Use "stage.setPointersPositions(event)" instead.'), this.setPointersPositions(t)
  }, Ut.prototype._getContentPosition = function() {
    if (!this.content || !this.content.getBoundingClientRect) return {
      top: 0,
      left: 0,
      scaleX: 1,
      scaleY: 1
    };
    var t = this.content.getBoundingClientRect();
    return {
      top: t.top,
      left: t.left,
      scaleX: t.width / this.content.clientWidth || 1,
      scaleY: t.height / this.content.clientHeight || 1
    }
  }, Ut.prototype._buildDOM = function() {
    if (this.bufferCanvas = new W({
        width: this.width(),
        height: this.height()
      }), this.bufferHitCanvas = new X({
        pixelRatio: 1,
        width: this.width(),
        height: this.height()
      }), O.isBrowser) {
      var t = this.container();
      if (!t) throw "Stage has no container. A container is required.";
      t.innerHTML = "", this.content = document.createElement("div"), this.content.style.position = "relative", this.content.style.userSelect = "none", this.content.className = "konvajs-content", this.content.setAttribute("role", "presentation"), t.appendChild(this.content), this._resizeDOM()
    }
  }, Ut.prototype.cache = function() {
    return L.warn("Cache function is not allowed for stage. You may use cache only for layers, groups and shapes."), this
  }, Ut.prototype.clearCache = function() {
    return this
  }, Ut.prototype.batchDraw = function() {
    return this.children.each(function(t) {
      t.batchDraw()
    }), this
  }, Ut);

  function Ut(t) {
    var e = Xt.call(this, Yt(t)) || this;
    return e._pointerPositions = [], e._changedPointerPositions = [], e._buildDOM(), e._bindContentEvents(), Ht.push(e), e.on("widthChange.konva heightChange.konva", e._resizeDOM), e.on("visibleChange.konva", e._checkVisibility), e.on("clipWidthChange.konva clipHeightChange.konva clipFuncChange.konva", function() {
      Yt(e.attrs)
    }), e._checkVisibility(), e
  }
  jt.prototype.nodeType = "Stage", i(jt), w.addGetterSetter(jt, "container");
  var qt, Vt = (P(Kt, qt = ut), Kt.prototype.createPNGStream = function() {
    return this.canvas._canvas.createPNGStream()
  }, Kt.prototype.getCanvas = function() {
    return this.canvas
  }, Kt.prototype.getHitCanvas = function() {
    return this.hitCanvas
  }, Kt.prototype.getContext = function() {
    return this.getCanvas().getContext()
  }, Kt.prototype.clear = function(t) {
    return this.getContext().clear(t), this
  }, Kt.prototype.setZIndex = function(t) {
    qt.prototype.setZIndex.call(this, t);
    var e = this.getStage();
    return e && (e.content.removeChild(this.getCanvas()._canvas), t < e.children.length - 1 ? e.content.insertBefore(this.getCanvas()._canvas, e.children[t + 1].getCanvas()._canvas) : e.content.appendChild(this.getCanvas()._canvas)), this
  }, Kt.prototype.moveToTop = function() {
    dt.prototype.moveToTop.call(this);
    var t = this.getStage();
    return t && (t.content.removeChild(this.getCanvas()._canvas), t.content.appendChild(this.getCanvas()._canvas)), !0
  }, Kt.prototype.moveUp = function() {
    if (!dt.prototype.moveUp.call(this)) return !1;
    var t = this.getStage();
    return !!t && (t.content.removeChild(this.getCanvas()._canvas), this.index < t.children.length - 1 ? t.content.insertBefore(this.getCanvas()._canvas, t.children[this.index + 1].getCanvas()._canvas) : t.content.appendChild(this.getCanvas()._canvas), !0)
  }, Kt.prototype.moveDown = function() {
    if (dt.prototype.moveDown.call(this)) {
      var t = this.getStage();
      if (t) {
        var e = t.children;
        t.content.removeChild(this.getCanvas()._canvas), t.content.insertBefore(this.getCanvas()._canvas, e[this.index + 1].getCanvas()._canvas)
      }
      return !0
    }
    return !1
  }, Kt.prototype.moveToBottom = function() {
    if (dt.prototype.moveToBottom.call(this)) {
      var t = this.getStage();
      if (t) {
        var e = t.children;
        t.content.removeChild(this.getCanvas()._canvas), t.content.insertBefore(this.getCanvas()._canvas, e[1].getCanvas()._canvas)
      }
      return !0
    }
    return !1
  }, Kt.prototype.getLayer = function() {
    return this
  }, Kt.prototype.hitGraphEnabled = function() {
    return !0
  }, Kt.prototype.remove = function() {
    var t = this.getCanvas()._canvas;
    return dt.prototype.remove.call(this), t && t.parentNode && L._isInDocument(t) && t.parentNode.removeChild(t), this
  }, Kt.prototype.getStage = function() {
    return this.parent
  }, Kt.prototype.setSize = function(t) {
    var e = t.width,
      i = t.height;
    return this.canvas.setSize(e, i), this
  }, Kt.prototype._toKonvaCanvas = function(t) {
    return (t = t || {}).width = t.width || this.getWidth(), t.height = t.height || this.getHeight(), t.x = void 0 !== t.x ? t.x : this.x(), t.y = void 0 !== t.y ? t.y : this.y(), dt.prototype._toKonvaCanvas.call(this, t)
  }, Kt.prototype._checkVisibility = function() {
    var t = this.visible();
    this.canvas._canvas.style.display = t ? "block" : "none"
  }, Kt.prototype._checkSmooth = function() {
    this.getContext()._context.imageSmoothingEnabled = this.imageSmoothingEnabled()
  }, Kt.prototype.getWidth = function() {
    if (this.parent) return this.parent.width()
  }, Kt.prototype.setWidth = function() {
    L.warn('Can not change width of layer. Use "stage.width(value)" function instead.')
  }, Kt.prototype.getHeight = function() {
    if (this.parent) return this.parent.height()
  }, Kt.prototype.setHeight = function() {
    L.warn('Can not change height of layer. Use "stage.height(value)" function instead.')
  }, Kt.prototype.getIntersection = function(t, e) {
    return null
  }, Kt.prototype.batchDraw = function() {
    var t = this;
    return this._waitingForDraw || (this._waitingForDraw = !0, L.requestAnimFrame(function() {
      t.draw(), t._waitingForDraw = !1
    })), this
  }, Kt.prototype._applyTransform = function(t, e, i) {
    var n = t.getAbsoluteTransform(i).getMatrix();
    e.transform(n[0], n[1], n[2], n[3], n[4], n[5])
  }, Kt);

  function Kt(t) {
    var e = qt.call(this, t) || this;
    return e.canvas = new W, e._waitingForDraw = !1, e.on("visibleChange", e._checkVisibility), e._checkVisibility(), e.on("imageSmoothingEnabledChange", e._checkSmooth), e._checkSmooth(), e
  }
  Vt.prototype.nodeType = "BaseLayer", w.addGetterSetter(Vt, "imageSmoothingEnabled", !0), w.addGetterSetter(Vt, "clearBeforeDraw", !0), o.mapMethods(Vt);
  var Qt, Jt = "hasShadow",
    Zt = "shadowRGBA",
    $t = "patternImage",
    te = "linearGradient",
    ee = "radialGradient";

  function ie() {
    return Qt || (Qt = L.createCanvasElement().getContext("2d"))
  }
  var ne = {};

  function re() {
    this._clearCache(Jt)
  }

  function oe() {
    this._clearCache(Zt)
  }

  function ae() {
    this._clearCache($t)
  }

  function se() {
    this._clearCache(te)
  }

  function he() {
    this._clearCache(ee)
  }
  var le, de = (P(ce, le = dt), ce.prototype.getContext = function() {
    return this.getLayer().getContext()
  }, ce.prototype.getCanvas = function() {
    return this.getLayer().getCanvas()
  }, ce.prototype.getSceneFunc = function() {
    return this.attrs.sceneFunc || this._sceneFunc
  }, ce.prototype.getHitFunc = function() {
    return this.attrs.hitFunc || this._hitFunc
  }, ce.prototype.hasShadow = function() {
    return this._getCache(Jt, this._hasShadow)
  }, ce.prototype._hasShadow = function() {
    return this.shadowEnabled() && 0 !== this.shadowOpacity() && !!(this.shadowColor() || this.shadowBlur() || this.shadowOffsetX() || this.shadowOffsetY())
  }, ce.prototype._getFillPattern = function() {
    return this._getCache($t, this.__getFillPattern)
  }, ce.prototype.__getFillPattern = function() {
    if (this.fillPatternImage()) return ie().createPattern(this.fillPatternImage(), this.fillPatternRepeat() || "repeat")
  }, ce.prototype._getLinearGradient = function() {
    return this._getCache(te, this.__getLinearGradient)
  }, ce.prototype.__getLinearGradient = function() {
    var t = this.fillLinearGradientColorStops();
    if (t) {
      for (var e = ie(), i = this.fillLinearGradientStartPoint(), n = this.fillLinearGradientEndPoint(), r = e.createLinearGradient(i.x, i.y, n.x, n.y), o = 0; o < t.length; o += 2) r.addColorStop(t[o], t[o + 1]);
      return r
    }
  }, ce.prototype._getRadialGradient = function() {
    return this._getCache(ee, this.__getRadialGradient)
  }, ce.prototype.__getRadialGradient = function() {
    var t = this.fillRadialGradientColorStops();
    if (t) {
      for (var e = ie(), i = this.fillRadialGradientStartPoint(), n = this.fillRadialGradientEndPoint(), r = e.createRadialGradient(i.x, i.y, this.fillRadialGradientStartRadius(), n.x, n.y, this.fillRadialGradientEndRadius()), o = 0; o < t.length; o += 2) r.addColorStop(t[o], t[o + 1]);
      return r
    }
  }, ce.prototype.getShadowRGBA = function() {
    return this._getCache(Zt, this._getShadowRGBA)
  }, ce.prototype._getShadowRGBA = function() {
    if (this.hasShadow()) {
      var t = L.colorToRGBA(this.shadowColor());
      return "rgba(" + t.r + "," + t.g + "," + t.b + "," + t.a * (this.shadowOpacity() || 1) + ")"
    }
  }, ce.prototype.hasFill = function() {
    return this.fillEnabled() && !!(this.fill() || this.fillPatternImage() || this.fillLinearGradientColorStops() || this.fillRadialGradientColorStops())
  }, ce.prototype.hasStroke = function() {
    return this.strokeEnabled() && this.strokeWidth() && !(!this.stroke() && !this.strokeLinearGradientColorStops())
  }, ce.prototype.hasHitStroke = function() {
    var t = this.hitStrokeWidth();
    return "auto" === t ? this.hasStroke() : this.strokeEnabled() && !!t
  }, ce.prototype.intersects = function(t) {
    var e = this.getStage().bufferHitCanvas;
    return e.getContext().clear(), this.drawHit(e), 0 < e.context.getImageData(Math.round(t.x), Math.round(t.y), 1, 1).data[3]
  }, ce.prototype.destroy = function() {
    return dt.prototype.destroy.call(this), delete ne[this.colorKey], delete this.colorKey, this
  }, ce.prototype._useBufferCanvas = function(t) {
    return !(t && !this.hasShadow() || !this.perfectDrawEnabled() || 1 === this.getAbsoluteOpacity() || !this.hasFill() || !this.hasStroke() || !this.getStage())
  }, ce.prototype.setStrokeHitEnabled = function(t) {
    L.warn("strokeHitEnabled property is deprecated. Please use hitStrokeWidth instead."), t ? this.hitStrokeWidth("auto") : this.hitStrokeWidth(0)
  }, ce.prototype.getStrokeHitEnabled = function() {
    return 0 !== this.hitStrokeWidth()
  }, ce.prototype.getSelfRect = function() {
    var t = this.size();
    return {
      x: this._centroid ? -t.width / 2 : 0,
      y: this._centroid ? -t.height / 2 : 0,
      width: t.width,
      height: t.height
    }
  }, ce.prototype.getClientRect = function(t) {
    var e = (t = t || {}).skipTransform,
      i = t.relativeTo,
      n = this.getSelfRect(),
      r = !t.skipStroke && this.hasStroke() && this.strokeWidth() || 0,
      o = n.width + r,
      a = n.height + r,
      s = !t.skipShadow && this.hasShadow(),
      h = s ? this.shadowOffsetX() : 0,
      l = s ? this.shadowOffsetY() : 0,
      d = o + Math.abs(h),
      c = a + Math.abs(l),
      p = s && this.shadowBlur() || 0,
      u = d + 2 * p,
      f = c + 2 * p,
      g = 0;
    Math.round(r / 2) !== r / 2 && (g = 1);
    var v = {
      width: u + g,
      height: f + g,
      x: -Math.round(r / 2 + p) + Math.min(h, 0) + n.x,
      y: -Math.round(r / 2 + p) + Math.min(l, 0) + n.y
    };
    return e ? v : this._transformedRect(v, i)
  }, ce.prototype.drawScene = function(t, e, i, n) {
    var r, o, a = this.getLayer(),
      s = t || a.getCanvas(),
      h = s.getContext(),
      l = this._getCanvasCache(),
      d = this.sceneFunc(),
      c = this.hasShadow(),
      p = this.hasStroke();
    if (!this.isVisible() && !i) return this;
    if (l) return h.save(), a._applyTransform(this, h, e), this._drawCachedSceneCanvas(h), h.restore(), this;
    if (!d) return this;
    if (h.save(), this._useBufferCanvas(i) && !n) {
      if ((o = (r = this.getStage().bufferCanvas).getContext()).clear(), o.save(), o._applyLineJoin(this), !i)
        if (a) a._applyTransform(this, o, e);
        else {
          var u = this.getAbsoluteTransform(e).getMatrix();
          h.transform(u[0], u[1], u[2], u[3], u[4], u[5])
        } d.call(this, o, this), o.restore();
      var f = r.pixelRatio;
      c && !s.hitCanvas ? (h.save(), h._applyShadow(this), h._applyOpacity(this), h._applyGlobalCompositeOperation(this), h.drawImage(r._canvas, 0, 0, r.width / f, r.height / f), h.restore()) : (h._applyOpacity(this), h._applyGlobalCompositeOperation(this), h.drawImage(r._canvas, 0, 0, r.width / f, r.height / f))
    } else {
      if (h._applyLineJoin(this), !i)
        if (a) a._applyTransform(this, h, e);
        else {
          var g = this.getAbsoluteTransform(e).getMatrix();
          h.transform(g[0], g[1], g[2], g[3], g[4], g[5])
        } c && p && !s.hitCanvas ? (h.save(), i || (h._applyOpacity(this), h._applyGlobalCompositeOperation(this)), h._applyShadow(this), d.call(this, h, this), h.restore(), this.hasFill() && this.shadowForStrokeEnabled() && d.call(this, h, this)) : c && !s.hitCanvas ? (h.save(), i || (h._applyOpacity(this), h._applyGlobalCompositeOperation(this)), h._applyShadow(this), d.call(this, h, this), h.restore()) : (i || (h._applyOpacity(this), h._applyGlobalCompositeOperation(this)), d.call(this, h, this))
    }
    return h.restore(), this
  }, ce.prototype.drawHit = function(t, e, i) {
    var n = this.getLayer(),
      r = t || n.hitCanvas,
      o = r && r.getContext(),
      a = this.hitFunc() || this.sceneFunc(),
      s = this._getCanvasCache(),
      h = s && s.hit;
    if (this.colorKey || (console.log(this), L.warn("Looks like your canvas has a destroyed shape in it. Do not reuse shape after you destroyed it. See the shape in logs above. If you want to reuse shape you should call remove() instead of destroy()")), !this.shouldDrawHit() && !i) return this;
    if (h) return o.save(), n._applyTransform(this, o, e), this._drawCachedHitCanvas(o), o.restore(), this;
    if (!a) return this;
    if (o.save(), o._applyLineJoin(this), !i)
      if (n) n._applyTransform(this, o, e);
      else {
        var l = this.getAbsoluteTransform(e).getMatrix();
        o.transform(l[0], l[1], l[2], l[3], l[4], l[5])
      } return a.call(this, o, this), o.restore(), this
  }, ce.prototype.drawHitFromCache = function(t) {
    void 0 === t && (t = 0);
    var e, i, n, r, o, a = this._getCanvasCache(),
      s = this._getCachedSceneCanvas(),
      h = a.hit,
      l = h.getContext(),
      d = h.getWidth(),
      c = h.getHeight();
    l.clear(), l.drawImage(s._canvas, 0, 0, d, c);
    try {
      for (n = (i = (e = l.getImageData(0, 0, d, c)).data).length, r = L._hexToRgb(this.colorKey), o = 0; o < n; o += 4) t < i[o + 3] ? (i[o] = r.r, i[o + 1] = r.g, i[o + 2] = r.b, i[o + 3] = 255) : i[o + 3] = 0;
      l.putImageData(e, 0, 0)
    } catch (t) {
      L.error("Unable to draw hit graph from cached scene canvas. " + t.message)
    }
    return this
  }, ce.prototype.hasPointerCapture = function(t) {
    return _t(t, this)
  }, ce.prototype.setPointerCapture = function(t) {
    St(t, this)
  }, ce.prototype.releaseCapture = function(t) {
    bt(t)
  }, ce);

  function ce(t) {
    for (var e, i = le.call(this, t) || this; !(e = L.getRandomColor()) || e in ne;);
    return i.colorKey = e, (ne[e] = i).on("shadowColorChange.konva shadowBlurChange.konva shadowOffsetChange.konva shadowOpacityChange.konva shadowEnabledChange.konva", re), i.on("shadowColorChange.konva shadowOpacityChange.konva shadowEnabledChange.konva", oe), i.on("fillPriorityChange.konva fillPatternImageChange.konva fillPatternRepeatChange.konva fillPatternScaleXChange.konva fillPatternScaleYChange.konva", ae), i.on("fillPriorityChange.konva fillLinearGradientColorStopsChange.konva fillLinearGradientStartPointXChange.konva fillLinearGradientStartPointYChange.konva fillLinearGradientEndPointXChange.konva fillLinearGradientEndPointYChange.konva", se), i.on("fillPriorityChange.konva fillRadialGradientColorStopsChange.konva fillRadialGradientStartPointXChange.konva fillRadialGradientStartPointYChange.konva fillRadialGradientEndPointXChange.konva fillRadialGradientEndPointYChange.konva fillRadialGradientStartRadiusChange.konva fillRadialGradientEndRadiusChange.konva", he), i
  }
  de.prototype._fillFunc = function(t) {
    t.fill()
  }, de.prototype._strokeFunc = function(t) {
    t.stroke()
  }, de.prototype._fillFuncHit = function(t) {
    t.fill()
  }, de.prototype._strokeFuncHit = function(t) {
    t.stroke()
  }, de.prototype._centroid = !1, de.prototype.nodeType = "Shape", i(de), w.addGetterSetter(de, "stroke", void 0, _()), w.addGetterSetter(de, "strokeWidth", 2, y()), w.addGetterSetter(de, "hitStrokeWidth", "auto", m()), w.addGetterSetter(de, "strokeHitEnabled", !0, S()), w.addGetterSetter(de, "perfectDrawEnabled", !0, S()), w.addGetterSetter(de, "shadowForStrokeEnabled", !0, S()), w.addGetterSetter(de, "lineJoin"), w.addGetterSetter(de, "lineCap"), w.addGetterSetter(de, "sceneFunc"), w.addGetterSetter(de, "hitFunc"), w.addGetterSetter(de, "dash"), w.addGetterSetter(de, "dashOffset", 0, y()), w.addGetterSetter(de, "shadowColor", void 0, _()), w.addGetterSetter(de, "shadowBlur", 0, y()), w.addGetterSetter(de, "shadowOpacity", 1, y()), w.addComponentsGetterSetter(de, "shadowOffset", ["x", "y"]), w.addGetterSetter(de, "shadowOffsetX", 0, y()), w.addGetterSetter(de, "shadowOffsetY", 0, y()), w.addGetterSetter(de, "fillPatternImage"), w.addGetterSetter(de, "fill", void 0, _()), w.addGetterSetter(de, "fillPatternX", 0, y()), w.addGetterSetter(de, "fillPatternY", 0, y()), w.addGetterSetter(de, "fillLinearGradientColorStops"), w.addGetterSetter(de, "strokeLinearGradientColorStops"), w.addGetterSetter(de, "fillRadialGradientStartRadius", 0), w.addGetterSetter(de, "fillRadialGradientEndRadius", 0), w.addGetterSetter(de, "fillRadialGradientColorStops"), w.addGetterSetter(de, "fillPatternRepeat", "repeat"), w.addGetterSetter(de, "fillEnabled", !0), w.addGetterSetter(de, "strokeEnabled", !0), w.addGetterSetter(de, "shadowEnabled", !0), w.addGetterSetter(de, "dashEnabled", !0), w.addGetterSetter(de, "strokeScaleEnabled", !0), w.addGetterSetter(de, "fillPriority", "color"), w.addComponentsGetterSetter(de, "fillPatternOffset", ["x", "y"]), w.addGetterSetter(de, "fillPatternOffsetX", 0, y()), w.addGetterSetter(de, "fillPatternOffsetY", 0, y()), w.addComponentsGetterSetter(de, "fillPatternScale", ["x", "y"]), w.addGetterSetter(de, "fillPatternScaleX", 1, y()), w.addGetterSetter(de, "fillPatternScaleY", 1, y()), w.addComponentsGetterSetter(de, "fillLinearGradientStartPoint", ["x", "y"]), w.addComponentsGetterSetter(de, "strokeLinearGradientStartPoint", ["x", "y"]), w.addGetterSetter(de, "fillLinearGradientStartPointX", 0), w.addGetterSetter(de, "strokeLinearGradientStartPointX", 0), w.addGetterSetter(de, "fillLinearGradientStartPointY", 0), w.addGetterSetter(de, "strokeLinearGradientStartPointY", 0), w.addComponentsGetterSetter(de, "fillLinearGradientEndPoint", ["x", "y"]), w.addComponentsGetterSetter(de, "strokeLinearGradientEndPoint", ["x", "y"]), w.addGetterSetter(de, "fillLinearGradientEndPointX", 0), w.addGetterSetter(de, "strokeLinearGradientEndPointX", 0), w.addGetterSetter(de, "fillLinearGradientEndPointY", 0), w.addGetterSetter(de, "strokeLinearGradientEndPointY", 0), w.addComponentsGetterSetter(de, "fillRadialGradientStartPoint", ["x", "y"]), w.addGetterSetter(de, "fillRadialGradientStartPointX", 0), w.addGetterSetter(de, "fillRadialGradientStartPointY", 0), w.addComponentsGetterSetter(de, "fillRadialGradientEndPoint", ["x", "y"]), w.addGetterSetter(de, "fillRadialGradientEndPointX", 0), w.addGetterSetter(de, "fillRadialGradientEndPointY", 0), w.addGetterSetter(de, "fillPatternRotation", 0), w.backCompat(de, {
    dashArray: "dash",
    getDashArray: "getDash",
    setDashArray: "getDash",
    drawFunc: "sceneFunc",
    getDrawFunc: "getSceneFunc",
    setDrawFunc: "setSceneFunc",
    drawHitFunc: "hitFunc",
    getDrawHitFunc: "getHitFunc",
    setDrawHitFunc: "setHitFunc"
  }), o.mapMethods(de);
  var pe, ue = [{
      x: 0,
      y: 0
    }, {
      x: -1,
      y: -1
    }, {
      x: 1,
      y: -1
    }, {
      x: 1,
      y: 1
    }, {
      x: -1,
      y: 1
    }],
    fe = ue.length,
    ge = (P(ve, pe = Vt), ve.prototype._setCanvasSize = function(t, e) {
      this.canvas.setSize(t, e), this.hitCanvas.setSize(t, e), this._checkSmooth()
    }, ve.prototype._validateAdd = function(t) {
      var e = t.getType();
      "Group" !== e && "Shape" !== e && L.throw("You may only add groups and shapes to a layer.")
    }, ve.prototype.getIntersection = function(t, e) {
      var i, n, r, o;
      if (!this.hitGraphEnabled() || !this.isVisible()) return null;
      for (var a = 1, s = !1;;) {
        for (n = 0; n < fe; n++) {
          if (r = ue[n], (o = (i = this._getIntersection({
              x: t.x + r.x * a,
              y: t.y + r.y * a
            })).shape) && e) return o.findAncestor(e, !0);
          if (o) return o;
          if (s = !!i.antialiased, !i.antialiased) break
        }
        if (!s) return null;
        a += 1
      }
    }, ve.prototype._getIntersection = function(t) {
      var e, i, n = this.hitCanvas.pixelRatio,
        r = this.hitCanvas.context.getImageData(Math.round(t.x * n), Math.round(t.y * n), 1, 1).data,
        o = r[3];
      return 255 === o ? (e = L._rgbToHex(r[0], r[1], r[2]), (i = ne["#" + e]) ? {
        shape: i
      } : {
        antialiased: !0
      }) : 0 < o ? {
        antialiased: !0
      } : {}
    }, ve.prototype.drawScene = function(t, e) {
      var i = this.getLayer(),
        n = t || i && i.getCanvas();
      return this._fire("beforeDraw", {
        node: this
      }), this.clearBeforeDraw() && n.getContext().clear(), ut.prototype.drawScene.call(this, n, e), this._fire("draw", {
        node: this
      }), this
    }, ve.prototype.drawHit = function(t, e) {
      var i = this.getLayer(),
        n = t || i && i.hitCanvas;
      return i && i.clearBeforeDraw() && i.getHitCanvas().getContext().clear(), ut.prototype.drawHit.call(this, n, e), this
    }, ve.prototype.clear = function(t) {
      return Vt.prototype.clear.call(this, t), this.getHitCanvas().getContext().clear(t), this
    }, ve.prototype.enableHitGraph = function() {
      return this.hitGraphEnabled(!0), this
    }, ve.prototype.disableHitGraph = function() {
      return this.hitGraphEnabled(!1), this
    }, ve.prototype.toggleHitCanvas = function() {
      if (this.parent) {
        var t = this.parent;
        this.hitCanvas._canvas.parentNode ? t.content.removeChild(this.hitCanvas._canvas) : t.content.appendChild(this.hitCanvas._canvas)
      }
    }, ve.prototype.setSize = function(t) {
      var e = t.width,
        i = t.height;
      return pe.prototype.setSize.call(this, {
        width: e,
        height: i
      }), this.hitCanvas.setSize(e, i), this
    }, ve);

  function ve() {
    var t = null !== pe && pe.apply(this, arguments) || this;
    return t.hitCanvas = new X({
      pixelRatio: 1
    }), t
  }
  ge.prototype.nodeType = "Layer", i(ge), w.addGetterSetter(ge, "hitGraphEnabled", !0, S()), o.mapMethods(ge);
  var ye, me = (P(_e, ye = Vt), _e.prototype._validateAdd = function(t) {
    "Shape" !== t.getType() && L.throw("You may only add shapes to a fast layer.")
  }, _e.prototype._setCanvasSize = function(t, e) {
    this.canvas.setSize(t, e), this._checkSmooth()
  }, _e.prototype.hitGraphEnabled = function() {
    return !1
  }, _e.prototype.drawScene = function(t) {
    var e = this.getLayer(),
      i = t || e && e.getCanvas();
    return this.clearBeforeDraw() && i.getContext().clear(), ut.prototype.drawScene.call(this, i), this
  }, _e.prototype.draw = function() {
    return this.drawScene(), this
  }, _e);

  function _e() {
    return null !== ye && ye.apply(this, arguments) || this
  }
  me.prototype.nodeType = "FastLayer", i(me), o.mapMethods(me);
  var Se, be = (P(xe, Se = ut), xe.prototype._validateAdd = function(t) {
    var e = t.getType();
    "Group" !== e && "Shape" !== e && L.throw("You may only add groups and shapes to groups.")
  }, xe);

  function xe() {
    return null !== Se && Se.apply(this, arguments) || this
  }
  be.prototype.nodeType = "Group", i(be), o.mapMethods(be);
  var we = n.performance && n.performance.now ? function() {
      return n.performance.now()
    } : function() {
      return (new Date).getTime()
    },
    Ce = (Pe.prototype.setLayers = function(t) {
      var e = [];
      return e = t ? 0 < t.length ? t : [t] : [], this.layers = e, this
    }, Pe.prototype.getLayers = function() {
      return this.layers
    }, Pe.prototype.addLayer = function(t) {
      var e, i = this.layers,
        n = i.length;
      for (e = 0; e < n; e++)
        if (i[e]._id === t._id) return !1;
      return this.layers.push(t), !0
    }, Pe.prototype.isRunning = function() {
      var t, e = Pe.animations,
        i = e.length;
      for (t = 0; t < i; t++)
        if (e[t].id === this.id) return !0;
      return !1
    }, Pe.prototype.start = function() {
      return this.stop(), this.frame.timeDiff = 0, this.frame.lastTime = we(), Pe._addAnimation(this), this
    }, Pe.prototype.stop = function() {
      return Pe._removeAnimation(this), this
    }, Pe.prototype._updateFrameObject = function(t) {
      this.frame.timeDiff = t - this.frame.lastTime, this.frame.lastTime = t, this.frame.time += this.frame.timeDiff, this.frame.frameRate = 1e3 / this.frame.timeDiff
    }, Pe._addAnimation = function(t) {
      this.animations.push(t), this._handleAnimation()
    }, Pe._removeAnimation = function(t) {
      var e, i = t.id,
        n = this.animations,
        r = n.length;
      for (e = 0; e < r; e++)
        if (n[e].id === i) {
          this.animations.splice(e, 1);
          break
        }
    }, Pe._runFrames = function() {
      var t, e, i, n, r, o, a, s, h = {},
        l = this.animations;
      for (n = 0; n < l.length; n++)
        if (e = (t = l[n]).layers, i = t.func, t._updateFrameObject(we()), o = e.length, !i || !1 !== i.call(t, t.frame))
          for (r = 0; r < o; r++) void 0 !== (a = e[r])._id && (h[a._id] = a);
      for (s in h) h.hasOwnProperty(s) && h[s].draw()
    }, Pe._animationLoop = function() {
      var t = Pe;
      t.animations.length ? (t._runFrames(), requestAnimationFrame(t._animationLoop)) : t.animRunning = !1
    }, Pe._handleAnimation = function() {
      this.animRunning || (this.animRunning = !0, requestAnimationFrame(this._animationLoop))
    }, Pe.animations = [], Pe.animIdCounter = 0, Pe.animRunning = !1, Pe);

  function Pe(t, e) {
    this.id = Pe.animIdCounter++, this.frame = {
      time: 0,
      timeDiff: 0,
      lastTime: we(),
      frameRate: 0
    }, this.func = t, this.setLayers(e)
  }
  var ke = {
      node: 1,
      duration: 1,
      easing: 1,
      onFinish: 1,
      yoyo: 1
    },
    Te = 0,
    Ae = ["fill", "stroke", "shadowColor"],
    Me = (Ge.prototype.fire = function(t) {
      var e = this[t];
      e && e()
    }, Ge.prototype.setTime = function(t) {
      t > this.duration ? this.yoyo ? (this._time = this.duration, this.reverse()) : this.finish() : t < 0 ? this.yoyo ? (this._time = 0, this.play()) : this.reset() : (this._time = t, this.update())
    }, Ge.prototype.getTime = function() {
      return this._time
    }, Ge.prototype.setPosition = function(t) {
      this.prevPos = this._pos, this.propFunc(t), this._pos = t
    }, Ge.prototype.getPosition = function(t) {
      return void 0 === t && (t = this._time), this.func(t, this.begin, this._change, this.duration)
    }, Ge.prototype.play = function() {
      this.state = 2, this._startTime = this.getTimer() - this._time, this.onEnterFrame(), this.fire("onPlay")
    }, Ge.prototype.reverse = function() {
      this.state = 3, this._time = this.duration - this._time, this._startTime = this.getTimer() - this._time, this.onEnterFrame(), this.fire("onReverse")
    }, Ge.prototype.seek = function(t) {
      this.pause(), this._time = t, this.update(), this.fire("onSeek")
    }, Ge.prototype.reset = function() {
      this.pause(), this._time = 0, this.update(), this.fire("onReset")
    }, Ge.prototype.finish = function() {
      this.pause(), this._time = this.duration, this.update(), this.fire("onFinish")
    }, Ge.prototype.update = function() {
      this.setPosition(this.getPosition(this._time))
    }, Ge.prototype.onEnterFrame = function() {
      var t = this.getTimer() - this._startTime;
      2 === this.state ? this.setTime(t) : 3 === this.state && this.setTime(this.duration - t)
    }, Ge.prototype.pause = function() {
      this.state = 1, this.fire("onPause")
    }, Ge.prototype.getTimer = function() {
      return (new Date).getTime()
    }, Ge);

  function Ge(t, e, i, n, r, o, a) {
    this.prop = t, this.propFunc = e, this.begin = n, this._pos = n, this.duration = o, this._change = 0, this.prevPos = 0, this.yoyo = a, this._time = 0, this._position = 0, this._startTime = 0, this._finish = 0, this.func = i, this._change = r - this.begin, this.pause()
  }
  var Re = (Oe.prototype._addAttr = function(t, e) {
    var i, n, r, o, a, s, h, l, d = this.node,
      c = d._id;
    if ((r = Oe.tweens[c][t]) && delete Oe.attrs[c][r][t], i = d.getAttr(t), L._isArray(e))
      if (n = [], a = Math.max(e.length, i.length), "points" === t && e.length !== i.length && (e.length > i.length ? (h = i, i = L._prepareArrayForTween(i, e, d.closed())) : (s = e, e = L._prepareArrayForTween(e, i, d.closed()))), 0 === t.indexOf("fill"))
        for (o = 0; o < a; o++)
          if (o % 2 == 0) n.push(e[o] - i[o]);
          else {
            var p = L.colorToRGBA(i[o]);
            l = L.colorToRGBA(e[o]), i[o] = p, n.push({
              r: l.r - p.r,
              g: l.g - p.g,
              b: l.b - p.b,
              a: l.a - p.a
            })
          }
    else
      for (o = 0; o < a; o++) n.push(e[o] - i[o]);
    else n = -1 !== Ae.indexOf(t) ? (i = L.colorToRGBA(i), {
      r: (l = L.colorToRGBA(e)).r - i.r,
      g: l.g - i.g,
      b: l.b - i.b,
      a: l.a - i.a
    }) : e - i;
    Oe.attrs[c][this._id][t] = {
      start: i,
      diff: n,
      end: e,
      trueEnd: s,
      trueStart: h
    }, Oe.tweens[c][t] = this._id
  }, Oe.prototype._tweenFunc = function(t) {
    var e, i, n, r, o, a, s, h, l = this.node,
      d = Oe.attrs[l._id][this._id];
    for (e in d) {
      if (n = (i = d[e]).start, r = i.diff, h = i.end, L._isArray(n))
        if (o = [], s = Math.max(n.length, h.length), 0 === e.indexOf("fill"))
          for (a = 0; a < s; a++) a % 2 == 0 ? o.push((n[a] || 0) + r[a] * t) : o.push("rgba(" + Math.round(n[a].r + r[a].r * t) + "," + Math.round(n[a].g + r[a].g * t) + "," + Math.round(n[a].b + r[a].b * t) + "," + (n[a].a + r[a].a * t) + ")");
        else
          for (a = 0; a < s; a++) o.push((n[a] || 0) + r[a] * t);
      else o = -1 !== Ae.indexOf(e) ? "rgba(" + Math.round(n.r + r.r * t) + "," + Math.round(n.g + r.g * t) + "," + Math.round(n.b + r.b * t) + "," + (n.a + r.a * t) + ")" : n + r * t;
      l.setAttr(e, o)
    }
  }, Oe.prototype._addListeners = function() {
    var i = this;
    this.tween.onPlay = function() {
      i.anim.start()
    }, this.tween.onReverse = function() {
      i.anim.start()
    }, this.tween.onPause = function() {
      i.anim.stop()
    }, this.tween.onFinish = function() {
      var t = i.node,
        e = Oe.attrs[t._id][i._id];
      e.points && e.points.trueEnd && t.setAttr("points", e.points.trueEnd), i.onFinish && i.onFinish.call(i)
    }, this.tween.onReset = function() {
      var t = i.node,
        e = Oe.attrs[t._id][i._id];
      e.points && e.points.trueStart && t.points(e.points.trueStart), i.onReset && i.onReset()
    }
  }, Oe.prototype.play = function() {
    return this.tween.play(), this
  }, Oe.prototype.reverse = function() {
    return this.tween.reverse(), this
  }, Oe.prototype.reset = function() {
    return this.tween.reset(), this
  }, Oe.prototype.seek = function(t) {
    return this.tween.seek(1e3 * t), this
  }, Oe.prototype.pause = function() {
    return this.tween.pause(), this
  }, Oe.prototype.finish = function() {
    return this.tween.finish(), this
  }, Oe.prototype.destroy = function() {
    var t, e = this.node._id,
      i = this._id,
      n = Oe.tweens[e];
    for (t in this.pause(), n) delete Oe.tweens[e][t];
    delete Oe.attrs[e][i]
  }, Oe.attrs = {}, Oe.tweens = {}, Oe);

  function Oe(t) {
    var e, i, n = this,
      r = t.node,
      o = r._id,
      a = t.easing || Ie.Linear,
      s = !!t.yoyo;
    e = void 0 === t.duration ? .3 : 0 === t.duration ? .001 : t.duration, this.node = r, this._id = Te++;
    var h = r.getLayer() || (r instanceof O.Stage ? r.getLayers() : null);
    for (i in h || L.error("Tween constructor have `node` that is not in a layer. Please add node into layer first."), this.anim = new Ce(function() {
        n.tween.onEnterFrame()
      }, h), this.tween = new Me(i, function(t) {
        n._tweenFunc(t)
      }, a, 0, 1, 1e3 * e, s), this._addListeners(), Oe.attrs[o] || (Oe.attrs[o] = {}), Oe.attrs[o][this._id] || (Oe.attrs[o][this._id] = {}), Oe.tweens[o] || (Oe.tweens[o] = {}), t) void 0 === ke[i] && this._addAttr(i, t[i]);
    this.reset(), this.onFinish = t.onFinish, this.onReset = t.onReset
  }
  dt.prototype.to = function(t) {
    var e = t.onFinish;
    t.node = this, t.onFinish = function() {
      this.destroy(), e && e()
    }, new Re(t).play()
  };
  var Le, Ie = {
      BackEaseIn: function(t, e, i, n) {
        return i * (t /= n) * t * (2.70158 * t - 1.70158) + e
      },
      BackEaseOut: function(t, e, i, n) {
        return i * ((t = t / n - 1) * t * (2.70158 * t + 1.70158) + 1) + e
      },
      BackEaseInOut: function(t, e, i, n) {
        var r = 1.70158;
        return (t /= n / 2) < 1 ? i / 2 * (t * t * ((1 + (r *= 1.525)) * t - r)) + e : i / 2 * ((t -= 2) * t * ((1 + (r *= 1.525)) * t + r) + 2) + e
      },
      ElasticEaseIn: function(t, e, i, n, r, o) {
        var a = 0;
        return 0 === t ? e : 1 == (t /= n) ? e + i : (o = o || .3 * n, a = !r || r < Math.abs(i) ? (r = i, o / 4) : o / (2 * Math.PI) * Math.asin(i / r), -r * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * n - a) * (2 * Math.PI) / o) + e)
      },
      ElasticEaseOut: function(t, e, i, n, r, o) {
        var a = 0;
        return 0 === t ? e : 1 == (t /= n) ? e + i : (o = o || .3 * n, a = !r || r < Math.abs(i) ? (r = i, o / 4) : o / (2 * Math.PI) * Math.asin(i / r), r * Math.pow(2, -10 * t) * Math.sin((t * n - a) * (2 * Math.PI) / o) + i + e)
      },
      ElasticEaseInOut: function(t, e, i, n, r, o) {
        var a = 0;
        return 0 === t ? e : 2 == (t /= n / 2) ? e + i : (o = o || n * (.3 * 1.5), a = !r || r < Math.abs(i) ? (r = i, o / 4) : o / (2 * Math.PI) * Math.asin(i / r), t < 1 ? r * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * n - a) * (2 * Math.PI) / o) * -.5 + e : r * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * n - a) * (2 * Math.PI) / o) * .5 + i + e)
      },
      BounceEaseOut: function(t, e, i, n) {
        return (t /= n) < 1 / 2.75 ? i * (7.5625 * t * t) + e : t < 2 / 2.75 ? i * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + e : t < 2.5 / 2.75 ? i * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + e : i * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + e
      },
      BounceEaseIn: function(t, e, i, n) {
        return i - Ie.BounceEaseOut(n - t, 0, i, n) + e
      },
      BounceEaseInOut: function(t, e, i, n) {
        return t < n / 2 ? .5 * Ie.BounceEaseIn(2 * t, 0, i, n) + e : .5 * Ie.BounceEaseOut(2 * t - n, 0, i, n) + .5 * i + e
      },
      EaseIn: function(t, e, i, n) {
        return i * (t /= n) * t + e
      },
      EaseOut: function(t, e, i, n) {
        return -i * (t /= n) * (t - 2) + e
      },
      EaseInOut: function(t, e, i, n) {
        return (t /= n / 2) < 1 ? i / 2 * t * t + e : -i / 2 * (--t * (t - 2) - 1) + e
      },
      StrongEaseIn: function(t, e, i, n) {
        return i * (t /= n) * t * t * t * t + e
      },
      StrongEaseOut: function(t, e, i, n) {
        return i * ((t = t / n - 1) * t * t * t * t + 1) + e
      },
      StrongEaseInOut: function(t, e, i, n) {
        return (t /= n / 2) < 1 ? i / 2 * t * t * t * t * t + e : i / 2 * ((t -= 2) * t * t * t * t + 2) + e
      },
      Linear: function(t, e, i, n) {
        return i * t / n + e
      }
    },
    Ee = L._assign(O, {
      Collection: o,
      Util: L,
      Transform: d,
      Node: dt,
      ids: K,
      names: Q,
      Container: ut,
      Stage: jt,
      stages: Ht,
      Layer: ge,
      FastLayer: me,
      Group: be,
      DD: U,
      Shape: de,
      shapes: ne,
      Animation: Ce,
      Tween: Re,
      Easings: Ie,
      Context: T,
      Canvas: B
    }),
    De = (P(Fe, Le = de), Fe.prototype._sceneFunc = function(t) {
      var e = O.getAngle(this.angle()),
        i = this.clockwise();
      t.beginPath(), t.arc(0, 0, this.outerRadius(), 0, e, i), t.arc(0, 0, this.innerRadius(), e, 0, !i), t.closePath(), t.fillStrokeShape(this)
    }, Fe.prototype.getWidth = function() {
      return 2 * this.outerRadius()
    }, Fe.prototype.getHeight = function() {
      return 2 * this.outerRadius()
    }, Fe.prototype.setWidth = function(t) {
      this.outerRadius(t / 2)
    }, Fe.prototype.setHeight = function(t) {
      this.outerRadius(t / 2)
    }, Fe);

  function Fe() {
    return null !== Le && Le.apply(this, arguments) || this
  }
  De.prototype._centroid = !0, De.prototype.className = "Arc", De.prototype._attrsAffectingSize = ["innerRadius", "outerRadius"], i(De), w.addGetterSetter(De, "innerRadius", 0, y()), w.addGetterSetter(De, "outerRadius", 0, y()), w.addGetterSetter(De, "angle", 0, y()), w.addGetterSetter(De, "clockwise", !1, S()), o.mapMethods(De);
  var Be, ze = (P(Ne, Be = de), Ne.prototype._sceneFunc = function(t) {
    var e, i, n, r = this.points(),
      o = r.length,
      a = this.tension(),
      s = this.closed(),
      h = this.bezier();
    if (o) {
      if (t.beginPath(), t.moveTo(r[0], r[1]), 0 !== a && 4 < o) {
        for (i = (e = this.getTensionPoints()).length, n = s ? 0 : 4, s || t.quadraticCurveTo(e[0], e[1], e[2], e[3]); n < i - 2;) t.bezierCurveTo(e[n++], e[n++], e[n++], e[n++], e[n++], e[n++]);
        s || t.quadraticCurveTo(e[i - 2], e[i - 1], r[o - 2], r[o - 1])
      } else if (h)
        for (n = 2; n < o;) t.bezierCurveTo(r[n++], r[n++], r[n++], r[n++], r[n++], r[n++]);
      else
        for (n = 2; n < o; n += 2) t.lineTo(r[n], r[n + 1]);
      s ? (t.closePath(), t.fillStrokeShape(this)) : t.strokeShape(this)
    }
  }, Ne.prototype.getTensionPoints = function() {
    return this._getCache("tensionPoints", this._getTensionPoints)
  }, Ne.prototype._getTensionPoints = function() {
    return this.closed() ? this._getTensionPointsClosed() : L._expandPoints(this.points(), this.tension())
  }, Ne.prototype._getTensionPointsClosed = function() {
    var t = this.points(),
      e = t.length,
      i = this.tension(),
      n = L._getControlPoints(t[e - 2], t[e - 1], t[0], t[1], t[2], t[3], i),
      r = L._getControlPoints(t[e - 4], t[e - 3], t[e - 2], t[e - 1], t[0], t[1], i),
      o = L._expandPoints(t, i);
    return [n[2], n[3]].concat(o).concat([r[0], r[1], t[e - 2], t[e - 1], r[2], r[3], n[0], n[1], t[0], t[1]])
  }, Ne.prototype.getWidth = function() {
    return this.getSelfRect().width
  }, Ne.prototype.getHeight = function() {
    return this.getSelfRect().height
  }, Ne.prototype.getSelfRect = function() {
    var t = this.points();
    if (t.length < 4) return {
      x: t[0] || 0,
      y: t[1] || 0,
      width: 0,
      height: 0
    };
    for (var e, i, n = (t = 0 !== this.tension() ? function() {
        for (var t = 0, e = 0, i = arguments.length; e < i; e++) t += arguments[e].length;
        var n = Array(t),
          r = 0;
        for (e = 0; e < i; e++)
          for (var o = arguments[e], a = 0, s = o.length; a < s; a++, r++) n[r] = o[a];
        return n
      }([t[0], t[1]], this._getTensionPoints(), [t[t.length - 2], t[t.length - 1]]) : this.points())[0], r = t[0], o = t[1], a = t[1], s = 0; s < t.length / 2; s++) e = t[2 * s], i = t[2 * s + 1], n = Math.min(n, e), r = Math.max(r, e), o = Math.min(o, i), a = Math.max(a, i);
    return {
      x: n,
      y: o,
      width: r - n,
      height: a - o
    }
  }, Ne);

  function Ne(t) {
    var e = Be.call(this, t) || this;
    return e.on("pointsChange.konva tensionChange.konva closedChange.konva bezierChange.konva", function() {
      this._clearCache("tensionPoints")
    }), e
  }
  ze.prototype.className = "Line", ze.prototype._attrsAffectingSize = ["points", "bezier", "tension"], i(ze), w.addGetterSetter(ze, "closed", !1), w.addGetterSetter(ze, "bezier", !1), w.addGetterSetter(ze, "tension", 0, y()), w.addGetterSetter(ze, "points", [], function() {
    if (O.isUnminified) return function(t, e) {
      return L._isArray(t) ? t.forEach(function(t) {
        L._isNumber(t) || L.warn('"' + e + '" attribute has non numeric element ' + t + ". Make sure that all elements are numbers.")
      }) : L.warn(g(t) + ' is a not valid value for "' + e + '" attribute. The value should be a array of numbers.'), t
    }
  }()), o.mapMethods(ze);
  var We, He = (P(Ye, We = ze), Ye.prototype._sceneFunc = function(t) {
    We.prototype._sceneFunc.call(this, t);
    var e = 2 * Math.PI,
      i = this.points(),
      n = i,
      r = 0 !== this.tension() && 4 < i.length;
    r && (n = this.getTensionPoints());
    var o, a, s = i.length;
    a = r ? (o = i[s - 2] - (n[n.length - 2] + n[n.length - 4]) / 2, i[s - 1] - (n[n.length - 1] + n[n.length - 3]) / 2) : (o = i[s - 2] - i[s - 4], i[s - 1] - i[s - 3]);
    var h = (Math.atan2(a, o) + e) % e,
      l = this.pointerLength(),
      d = this.pointerWidth();
    t.save(), t.beginPath(), t.translate(i[s - 2], i[s - 1]), t.rotate(h), t.moveTo(0, 0), t.lineTo(-l, d / 2), t.lineTo(-l, -d / 2), t.closePath(), t.restore(), this.pointerAtBeginning() && (t.save(), t.translate(i[0], i[1]), a = r ? (o = (n[0] + n[2]) / 2 - i[0], (n[1] + n[3]) / 2 - i[1]) : (o = i[2] - i[0], i[3] - i[1]), t.rotate((Math.atan2(-a, -o) + e) % e), t.moveTo(0, 0), t.lineTo(-l, d / 2), t.lineTo(-l, -d / 2), t.closePath(), t.restore());
    var c = this.dashEnabled();
    c && (this.attrs.dashEnabled = !1, t.setLineDash([])), t.fillStrokeShape(this), c && (this.attrs.dashEnabled = !0)
  }, Ye.prototype.getSelfRect = function() {
    var t = We.prototype.getSelfRect.call(this),
      e = this.pointerWidth() / 2;
    return {
      x: t.x - e,
      y: t.y - e,
      width: t.width + 2 * e,
      height: t.height + 2 * e
    }
  }, Ye);

  function Ye() {
    return null !== We && We.apply(this, arguments) || this
  }
  He.prototype.className = "Arrow", i(He), w.addGetterSetter(He, "pointerLength", 10, y()), w.addGetterSetter(He, "pointerWidth", 10, y()), w.addGetterSetter(He, "pointerAtBeginning", !1), o.mapMethods(He);
  var Xe, je = (P(Ue, Xe = de), Ue.prototype._sceneFunc = function(t) {
    t.beginPath(), t.arc(0, 0, this.radius(), 0, 2 * Math.PI, !1), t.closePath(), t.fillStrokeShape(this)
  }, Ue.prototype.getWidth = function() {
    return 2 * this.radius()
  }, Ue.prototype.getHeight = function() {
    return 2 * this.radius()
  }, Ue.prototype.setWidth = function(t) {
    this.radius() !== t / 2 && this.radius(t / 2)
  }, Ue.prototype.setHeight = function(t) {
    this.radius() !== t / 2 && this.radius(t / 2)
  }, Ue);

  function Ue() {
    return null !== Xe && Xe.apply(this, arguments) || this
  }
  je.prototype._centroid = !0, je.prototype.className = "Circle", je.prototype._attrsAffectingSize = ["radius"], i(je), w.addGetterSetter(je, "radius", 0, y()), o.mapMethods(je);
  var qe, Ve = (P(Ke, qe = de), Ke.prototype._sceneFunc = function(t) {
    var e = this.radiusX(),
      i = this.radiusY();
    t.beginPath(), t.save(), e !== i && t.scale(1, i / e), t.arc(0, 0, e, 0, 2 * Math.PI, !1), t.restore(), t.closePath(), t.fillStrokeShape(this)
  }, Ke.prototype.getWidth = function() {
    return 2 * this.radiusX()
  }, Ke.prototype.getHeight = function() {
    return 2 * this.radiusY()
  }, Ke.prototype.setWidth = function(t) {
    this.radiusX(t / 2)
  }, Ke.prototype.setHeight = function(t) {
    this.radiusY(t / 2)
  }, Ke);

  function Ke() {
    return null !== qe && qe.apply(this, arguments) || this
  }
  Ve.prototype.className = "Ellipse", Ve.prototype._centroid = !0, Ve.prototype._attrsAffectingSize = ["radiusX", "radiusY"], i(Ve), w.addComponentsGetterSetter(Ve, "radius", ["x", "y"]), w.addGetterSetter(Ve, "radiusX", 0, y()), w.addGetterSetter(Ve, "radiusY", 0, y()), o.mapMethods(Ve);
  var Qe, Je = (P(Ze, Qe = de), Ze.prototype._useBufferCanvas = function() {
    return !(!this.hasShadow() && 1 === this.getAbsoluteOpacity() || !this.hasStroke() || !this.getStage())
  }, Ze.prototype._sceneFunc = function(t) {
    var e, i, n, r = this.width(),
      o = this.height(),
      a = this.image();
    a && (e = this.cropWidth(), i = this.cropHeight(), n = e && i ? [a, this.cropX(), this.cropY(), e, i, 0, 0, r, o] : [a, 0, 0, r, o]), (this.hasFill() || this.hasStroke()) && (t.beginPath(), t.rect(0, 0, r, o), t.closePath(), t.fillStrokeShape(this)), a && t.drawImage.apply(t, n)
  }, Ze.prototype._hitFunc = function(t) {
    var e = this.width(),
      i = this.height();
    t.beginPath(), t.rect(0, 0, e, i), t.closePath(), t.fillStrokeShape(this)
  }, Ze.prototype.getWidth = function() {
    var t, e = this.image();
    return null != (t = this.attrs.width) ? t : e ? e.width : 0
  }, Ze.prototype.getHeight = function() {
    var t, e = this.image();
    return null != (t = this.attrs.height) ? t : e ? e.height : 0
  }, Ze.fromURL = function(t, e) {
    var i = L.createImageElement();
    i.onload = function() {
      var t = new Ze({
        image: i
      });
      e(t)
    }, i.crossOrigin = "Anonymous", i.src = t
  }, Ze);

  function Ze() {
    return null !== Qe && Qe.apply(this, arguments) || this
  }
  Je.prototype.className = "Image", i(Je), w.addGetterSetter(Je, "image"), w.addComponentsGetterSetter(Je, "crop", ["x", "y", "width", "height"]), w.addGetterSetter(Je, "cropX", 0, y()), w.addGetterSetter(Je, "cropY", 0, y()), w.addGetterSetter(Je, "cropWidth", 0, y()), w.addGetterSetter(Je, "cropHeight", 0, y()), o.mapMethods(Je);
  var $e, ti = ["fontFamily", "fontSize", "fontStyle", "padding", "lineHeight", "text", "width"],
    ei = "right",
    ii = "down",
    ni = "left",
    ri = ti.length,
    oi = (P(ai, $e = be), ai.prototype.getText = function() {
      return this.find("Text")[0]
    }, ai.prototype.getTag = function() {
      return this.find("Tag")[0]
    }, ai.prototype._addListeners = function(t) {
      function e() {
        n._sync()
      }
      var i, n = this;
      for (i = 0; i < ri; i++) t.on(ti[i] + "Change.konva", e)
    }, ai.prototype.getWidth = function() {
      return this.getText().width()
    }, ai.prototype.getHeight = function() {
      return this.getText().height()
    }, ai.prototype._sync = function() {
      var t, e, i, n, r, o, a, s = this.getText(),
        h = this.getTag();
      if (s && h) {
        switch (t = s.width(), e = s.height(), i = h.pointerDirection(), n = h.pointerWidth(), a = h.pointerHeight(), o = r = 0, i) {
          case "up":
            r = t / 2, o = -1 * a;
            break;
          case ei:
            r = t + n, o = e / 2;
            break;
          case ii:
            r = t / 2, o = e + a;
            break;
          case ni:
            r = -1 * n, o = e / 2
        }
        h.setAttrs({
          x: -1 * r,
          y: -1 * o,
          width: t,
          height: e
        }), s.setAttrs({
          x: -1 * r,
          y: -1 * o
        })
      }
    }, ai);

  function ai(t) {
    var e = $e.call(this, t) || this;
    return e.on("add.konva", function(t) {
      this._addListeners(t.child), this._sync()
    }), e
  }
  oi.prototype.className = "Label", i(oi), o.mapMethods(oi);
  var si, hi = (P(li, si = de), li.prototype._sceneFunc = function(t) {
    var e = this.width(),
      i = this.height(),
      n = this.pointerDirection(),
      r = this.pointerWidth(),
      o = this.pointerHeight(),
      a = Math.min(this.cornerRadius(), e / 2, i / 2);
    t.beginPath(), a ? t.moveTo(a, 0) : t.moveTo(0, 0), "up" === n && (t.lineTo((e - r) / 2, 0), t.lineTo(e / 2, -1 * o), t.lineTo((e + r) / 2, 0)), a ? (t.lineTo(e - a, 0), t.arc(e - a, a, a, 3 * Math.PI / 2, 0, !1)) : t.lineTo(e, 0), n === ei && (t.lineTo(e, (i - o) / 2), t.lineTo(e + r, i / 2), t.lineTo(e, (i + o) / 2)), a ? (t.lineTo(e, i - a), t.arc(e - a, i - a, a, 0, Math.PI / 2, !1)) : t.lineTo(e, i), n === ii && (t.lineTo((e + r) / 2, i), t.lineTo(e / 2, i + o), t.lineTo((e - r) / 2, i)), a ? (t.lineTo(a, i), t.arc(a, i - a, a, Math.PI / 2, Math.PI, !1)) : t.lineTo(0, i), n === ni && (t.lineTo(0, (i + o) / 2), t.lineTo(-1 * r, i / 2), t.lineTo(0, (i - o) / 2)), a && (t.lineTo(0, a), t.arc(a, a, a, Math.PI, 3 * Math.PI / 2, !1)), t.closePath(), t.fillStrokeShape(this)
  }, li.prototype.getSelfRect = function() {
    var t = 0,
      e = 0,
      i = this.pointerWidth(),
      n = this.pointerHeight(),
      r = this.pointerDirection(),
      o = this.width(),
      a = this.height();
    return "up" === r ? (e -= n, a += n) : r === ii ? a += n : r === ni ? (t -= 1.5 * i, o += i) : r === ei && (o += 1.5 * i), {
      x: t,
      y: e,
      width: o,
      height: a
    }
  }, li);

  function li() {
    return null !== si && si.apply(this, arguments) || this
  }
  hi.prototype.className = "Tag", i(hi), w.addGetterSetter(hi, "pointerDirection", "none"), w.addGetterSetter(hi, "pointerWidth", 0, y()), w.addGetterSetter(hi, "pointerHeight", 0, y()), w.addGetterSetter(hi, "cornerRadius", 0, y()), o.mapMethods(hi);
  var di, ci = (P(pi, di = de), pi.prototype._sceneFunc = function(t) {
    var e = this.dataArray;
    t.beginPath();
    for (var i = !1, n = 0; n < e.length; n++) {
      var r = e[n].command,
        o = e[n].points;
      switch (r) {
        case "L":
          t.lineTo(o[0], o[1]);
          break;
        case "M":
          t.moveTo(o[0], o[1]);
          break;
        case "C":
          t.bezierCurveTo(o[0], o[1], o[2], o[3], o[4], o[5]);
          break;
        case "Q":
          t.quadraticCurveTo(o[0], o[1], o[2], o[3]);
          break;
        case "A":
          var a = o[0],
            s = o[1],
            h = o[2],
            l = o[3],
            d = o[4],
            c = o[5],
            p = o[6],
            u = o[7],
            f = l < h ? h : l,
            g = l < h ? 1 : h / l,
            v = l < h ? l / h : 1;
          t.translate(a, s), t.rotate(p), t.scale(g, v), t.arc(0, 0, f, d, d + c, 1 - u), t.scale(1 / g, 1 / v), t.rotate(-p), t.translate(-a, -s);
          break;
        case "z":
          i = !0, t.closePath()
      }
    }
    i || this.hasFill() ? t.fillStrokeShape(this) : t.strokeShape(this)
  }, pi.prototype.getSelfRect = function() {
    var s = [];
    this.dataArray.forEach(function(t) {
      if ("A" === t.command) {
        var e = t.points[4],
          i = t.points[5],
          n = t.points[4] + i,
          r = Math.PI / 180;
        if (Math.abs(e - n) < r && (r = Math.abs(e - n)), i < 0)
          for (var o = e - r; n < o; o -= r) {
            var a = pi.getPointOnEllipticalArc(t.points[0], t.points[1], t.points[2], t.points[3], o, 0);
            s.push(a.x, a.y)
          } else
            for (o = e + r; o < n; o += r) a = pi.getPointOnEllipticalArc(t.points[0], t.points[1], t.points[2], t.points[3], o, 0), s.push(a.x, a.y)
      } else if ("C" === t.command)
        for (o = 0; o <= 1; o += .01) a = pi.getPointOnCubicBezier(o, t.start.x, t.start.y, t.points[0], t.points[1], t.points[2], t.points[3], t.points[4], t.points[5]), s.push(a.x, a.y);
      else s = s.concat(t.points)
    });
    for (var t, e, i = s[0], n = s[0], r = s[1], o = s[1], a = 0; a < s.length / 2; a++) t = s[2 * a], e = s[2 * a + 1], isNaN(t) || (i = Math.min(i, t), n = Math.max(n, t)), isNaN(e) || (r = Math.min(r, e), o = Math.max(o, e));
    return {
      x: Math.round(i),
      y: Math.round(r),
      width: Math.round(n - i),
      height: Math.round(o - r)
    }
  }, pi.prototype.getLength = function() {
    return this.pathLength
  }, pi.prototype.getPointAtLength = function(t) {
    var e, i = 0,
      n = this.dataArray.length;
    if (!n) return null;
    for (; i < n && t > this.dataArray[i].pathLength;) t -= this.dataArray[i].pathLength, ++i;
    if (i === n) return {
      x: (e = this.dataArray[i - 1].points.slice(-2))[0],
      y: e[1]
    };
    if (t < .01) return {
      x: (e = this.dataArray[i].points.slice(0, 2))[0],
      y: e[1]
    };
    var r = this.dataArray[i],
      o = r.points;
    switch (r.command) {
      case "L":
        return pi.getPointOnLine(t, r.start.x, r.start.y, o[0], o[1]);
      case "C":
        return pi.getPointOnCubicBezier(t / r.pathLength, r.start.x, r.start.y, o[0], o[1], o[2], o[3], o[4], o[5]);
      case "Q":
        return pi.getPointOnQuadraticBezier(t / r.pathLength, r.start.x, r.start.y, o[0], o[1], o[2], o[3]);
      case "A":
        var a = o[0],
          s = o[1],
          h = o[2],
          l = o[3],
          d = o[4],
          c = o[5],
          p = o[6];
        return d += c * t / r.pathLength, pi.getPointOnEllipticalArc(a, s, h, l, d, p)
    }
    return null
  }, pi.getLineLength = function(t, e, i, n) {
    return Math.sqrt((i - t) * (i - t) + (n - e) * (n - e))
  }, pi.getPointOnLine = function(t, e, i, n, r, o, a) {
    void 0 === o && (o = e), void 0 === a && (a = i);
    var s = (r - i) / (n - e + 1e-8),
      h = Math.sqrt(t * t / (1 + s * s));
    n < e && (h *= -1);
    var l, d = s * h;
    if (n === e) l = {
      x: o,
      y: a + d
    };
    else if ((a - i) / (o - e + 1e-8) == s) l = {
      x: o + h,
      y: a + d
    };
    else {
      var c, p, u = this.getLineLength(e, i, n, r);
      if (u < 1e-8) return;
      var f = (o - e) * (n - e) + (a - i) * (r - i);
      c = e + (f /= u * u) * (n - e), p = i + f * (r - i);
      var g = this.getLineLength(o, a, c, p),
        v = Math.sqrt(t * t - g * g);
      h = Math.sqrt(v * v / (1 + s * s)), n < e && (h *= -1), l = {
        x: c + h,
        y: p + (d = s * h)
      }
    }
    return l
  }, pi.getPointOnCubicBezier = function(t, e, i, n, r, o, a, s, h) {
    function l(t) {
      return t * t * t
    }

    function d(t) {
      return 3 * t * t * (1 - t)
    }

    function c(t) {
      return 3 * t * (1 - t) * (1 - t)
    }

    function p(t) {
      return (1 - t) * (1 - t) * (1 - t)
    }
    return {
      x: s * l(t) + o * d(t) + n * c(t) + e * p(t),
      y: h * l(t) + a * d(t) + r * c(t) + i * p(t)
    }
  }, pi.getPointOnQuadraticBezier = function(t, e, i, n, r, o, a) {
    function s(t) {
      return t * t
    }

    function h(t) {
      return 2 * t * (1 - t)
    }

    function l(t) {
      return (1 - t) * (1 - t)
    }
    return {
      x: o * s(t) + n * h(t) + e * l(t),
      y: a * s(t) + r * h(t) + i * l(t)
    }
  }, pi.getPointOnEllipticalArc = function(t, e, i, n, r, o) {
    var a = Math.cos(o),
      s = Math.sin(o),
      h = i * Math.cos(r),
      l = n * Math.sin(r);
    return {
      x: t + (h * a - l * s),
      y: e + (h * s + l * a)
    }
  }, pi.parsePathData = function(t) {
    if (!t) return [];
    var e = t,
      i = ["m", "M", "l", "L", "v", "V", "h", "H", "z", "Z", "c", "C", "q", "Q", "t", "T", "s", "S", "a", "A"];
    e = e.replace(new RegExp(" ", "g"), ",");
    for (var n = 0; n < i.length; n++) e = e.replace(new RegExp(i[n], "g"), "|" + i[n]);
    var r, o = e.split("|"),
      a = [],
      s = [],
      h = 0,
      l = 0,
      d = /([-+]?((\d+\.\d+)|((\d+)|(\.\d+)))(?:e[-+]?\d+)?)/gi;
    for (n = 1; n < o.length; n++) {
      var c = o[n],
        p = c.charAt(0);
      for (c = c.slice(1), s.length = 0; r = d.exec(c);) s.push(r[0]);
      for (var u = [], f = 0, g = s.length; f < g; f++) {
        var v = parseFloat(s[f]);
        isNaN(v) ? u.push(0) : u.push(v)
      }
      for (; 0 < u.length && !isNaN(u[0]);) {
        var y, m, _, S, b, x, w, C, P, k, T = null,
          A = [],
          M = h,
          G = l;
        switch (p) {
          case "l":
            h += u.shift(), l += u.shift(), T = "L", A.push(h, l);
            break;
          case "L":
            h = u.shift(), l = u.shift(), A.push(h, l);
            break;
          case "m":
            var R = u.shift(),
              O = u.shift();
            if (h += R, l += O, T = "M", 2 < a.length && "z" === a[a.length - 1].command)
              for (var L = a.length - 2; 0 <= L; L--)
                if ("M" === a[L].command) {
                  h = a[L].points[0] + R, l = a[L].points[1] + O;
                  break
                } A.push(h, l), p = "l";
            break;
          case "M":
            h = u.shift(), l = u.shift(), T = "M", A.push(h, l), p = "L";
            break;
          case "h":
            h += u.shift(), T = "L", A.push(h, l);
            break;
          case "H":
            h = u.shift(), T = "L", A.push(h, l);
            break;
          case "v":
            l += u.shift(), T = "L", A.push(h, l);
            break;
          case "V":
            l = u.shift(), T = "L", A.push(h, l);
            break;
          case "C":
            A.push(u.shift(), u.shift(), u.shift(), u.shift()), h = u.shift(), l = u.shift(), A.push(h, l);
            break;
          case "c":
            A.push(h + u.shift(), l + u.shift(), h + u.shift(), l + u.shift()), h += u.shift(), l += u.shift(), T = "C", A.push(h, l);
            break;
          case "S":
            m = h, _ = l, "C" === (y = a[a.length - 1]).command && (m = h + (h - y.points[2]), _ = l + (l - y.points[3])), A.push(m, _, u.shift(), u.shift()), h = u.shift(), l = u.shift(), T = "C", A.push(h, l);
            break;
          case "s":
            m = h, _ = l, "C" === (y = a[a.length - 1]).command && (m = h + (h - y.points[2]), _ = l + (l - y.points[3])), A.push(m, _, h + u.shift(), l + u.shift()), h += u.shift(), l += u.shift(), T = "C", A.push(h, l);
            break;
          case "Q":
            A.push(u.shift(), u.shift()), h = u.shift(), l = u.shift(), A.push(h, l);
            break;
          case "q":
            A.push(h + u.shift(), l + u.shift()), h += u.shift(), l += u.shift(), T = "Q", A.push(h, l);
            break;
          case "T":
            m = h, _ = l, "Q" === (y = a[a.length - 1]).command && (m = h + (h - y.points[0]), _ = l + (l - y.points[1])), h = u.shift(), l = u.shift(), T = "Q", A.push(m, _, h, l);
            break;
          case "t":
            m = h, _ = l, "Q" === (y = a[a.length - 1]).command && (m = h + (h - y.points[0]), _ = l + (l - y.points[1])), h += u.shift(), l += u.shift(), T = "Q", A.push(m, _, h, l);
            break;
          case "A":
            S = u.shift(), b = u.shift(), x = u.shift(), w = u.shift(), C = u.shift(), P = h, k = l, h = u.shift(), l = u.shift(), T = "A", A = this.convertEndpointToCenterParameterization(P, k, h, l, w, C, S, b, x);
            break;
          case "a":
            S = u.shift(), b = u.shift(), x = u.shift(), w = u.shift(), C = u.shift(), P = h, k = l, h += u.shift(), l += u.shift(), T = "A", A = this.convertEndpointToCenterParameterization(P, k, h, l, w, C, S, b, x)
        }
        a.push({
          command: T || p,
          points: A,
          start: {
            x: M,
            y: G
          },
          pathLength: this.calcLength(M, G, T || p, A)
        })
      }
      "z" !== p && "Z" !== p || a.push({
        command: "z",
        points: [],
        start: void 0,
        pathLength: 0
      })
    }
    return a
  }, pi.calcLength = function(t, e, i, n) {
    var r, o, a, s, h = pi;
    switch (i) {
      case "L":
        return h.getLineLength(t, e, n[0], n[1]);
      case "C":
        for (r = 0, o = h.getPointOnCubicBezier(0, t, e, n[0], n[1], n[2], n[3], n[4], n[5]), s = .01; s <= 1; s += .01) a = h.getPointOnCubicBezier(s, t, e, n[0], n[1], n[2], n[3], n[4], n[5]), r += h.getLineLength(o.x, o.y, a.x, a.y), o = a;
        return r;
      case "Q":
        for (r = 0, o = h.getPointOnQuadraticBezier(0, t, e, n[0], n[1], n[2], n[3]), s = .01; s <= 1; s += .01) a = h.getPointOnQuadraticBezier(s, t, e, n[0], n[1], n[2], n[3]), r += h.getLineLength(o.x, o.y, a.x, a.y), o = a;
        return r;
      case "A":
        r = 0;
        var l = n[4],
          d = n[5],
          c = n[4] + d,
          p = Math.PI / 180;
        if (Math.abs(l - c) < p && (p = Math.abs(l - c)), o = h.getPointOnEllipticalArc(n[0], n[1], n[2], n[3], l, 0), d < 0)
          for (s = l - p; c < s; s -= p) a = h.getPointOnEllipticalArc(n[0], n[1], n[2], n[3], s, 0), r += h.getLineLength(o.x, o.y, a.x, a.y), o = a;
        else
          for (s = l + p; s < c; s += p) a = h.getPointOnEllipticalArc(n[0], n[1], n[2], n[3], s, 0), r += h.getLineLength(o.x, o.y, a.x, a.y), o = a;
        return a = h.getPointOnEllipticalArc(n[0], n[1], n[2], n[3], c, 0), r += h.getLineLength(o.x, o.y, a.x, a.y)
    }
    return 0
  }, pi.convertEndpointToCenterParameterization = function(t, e, i, n, r, o, a, s, h) {
    var l = h * (Math.PI / 180),
      d = Math.cos(l) * (t - i) / 2 + Math.sin(l) * (e - n) / 2,
      c = -1 * Math.sin(l) * (t - i) / 2 + Math.cos(l) * (e - n) / 2,
      p = d * d / (a * a) + c * c / (s * s);
    1 < p && (a *= Math.sqrt(p), s *= Math.sqrt(p));
    var u = Math.sqrt((a * a * (s * s) - a * a * (c * c) - s * s * (d * d)) / (a * a * (c * c) + s * s * (d * d)));

    function f(t) {
      return Math.sqrt(t[0] * t[0] + t[1] * t[1])
    }

    function g(t, e) {
      return (t[0] * e[0] + t[1] * e[1]) / (f(t) * f(e))
    }

    function v(t, e) {
      return (t[0] * e[1] < t[1] * e[0] ? -1 : 1) * Math.acos(g(t, e))
    }
    r === o && (u *= -1), isNaN(u) && (u = 0);
    var y = u * a * c / s,
      m = u * -s * d / a,
      _ = (t + i) / 2 + Math.cos(l) * y - Math.sin(l) * m,
      S = (e + n) / 2 + Math.sin(l) * y + Math.cos(l) * m,
      b = v([1, 0], [(d - y) / a, (c - m) / s]),
      x = [(d - y) / a, (c - m) / s],
      w = [(-1 * d - y) / a, (-1 * c - m) / s],
      C = v(x, w);
    return g(x, w) <= -1 && (C = Math.PI), 1 <= g(x, w) && (C = 0), 0 === o && 0 < C && (C -= 2 * Math.PI), 1 === o && C < 0 && (C += 2 * Math.PI), [_, S, a, s, b, C, l, o]
  }, pi);

  function pi(t) {
    var e = di.call(this, t) || this;
    e.dataArray = [], e.pathLength = 0, e.dataArray = pi.parsePathData(e.data());
    for (var i = e.pathLength = 0; i < e.dataArray.length; ++i) e.pathLength += e.dataArray[i].pathLength;
    return e.on("dataChange.konva", function() {
      this.dataArray = pi.parsePathData(this.data());
      for (var t = this.pathLength = 0; t < this.dataArray.length; ++t) this.pathLength += this.dataArray[t].pathLength
    }), e
  }
  ci.prototype.className = "Path", ci.prototype._attrsAffectingSize = ["data"], i(ci), w.addGetterSetter(ci, "data"), o.mapMethods(ci);
  var ui, fi = (P(gi, ui = de), gi.prototype._sceneFunc = function(t) {
    var e = this.cornerRadius(),
      i = this.width(),
      n = this.height();
    if (t.beginPath(), e) {
      var r = 0,
        o = 0,
        a = 0,
        s = 0;
      "number" == typeof e ? r = o = a = s = Math.min(e, i / 2, n / 2) : (r = Math.min(e[0], i / 2, n / 2), o = Math.min(e[1], i / 2, n / 2), s = Math.min(e[2], i / 2, n / 2), a = Math.min(e[3], i / 2, n / 2)), t.moveTo(r, 0), t.lineTo(i - o, 0), t.arc(i - o, o, o, 3 * Math.PI / 2, 0, !1), t.lineTo(i, n - s), t.arc(i - s, n - s, s, 0, Math.PI / 2, !1), t.lineTo(a, n), t.arc(a, n - a, a, Math.PI / 2, Math.PI, !1), t.lineTo(0, r), t.arc(r, r, r, Math.PI, 3 * Math.PI / 2, !1)
    } else t.rect(0, 0, i, n);
    t.closePath(), t.fillStrokeShape(this)
  }, gi);

  function gi() {
    return null !== ui && ui.apply(this, arguments) || this
  }
  fi.prototype.className = "Rect", i(fi), w.addGetterSetter(fi, "cornerRadius", 0), o.mapMethods(fi);
  var vi, yi = (P(mi, vi = de), mi.prototype._sceneFunc = function(t) {
    var e, i, n, r = this.sides(),
      o = this.radius();
    for (t.beginPath(), t.moveTo(0, 0 - o), e = 1; e < r; e++) i = o * Math.sin(2 * e * Math.PI / r), n = -1 * o * Math.cos(2 * e * Math.PI / r), t.lineTo(i, n);
    t.closePath(), t.fillStrokeShape(this)
  }, mi.prototype.getWidth = function() {
    return 2 * this.radius()
  }, mi.prototype.getHeight = function() {
    return 2 * this.radius()
  }, mi.prototype.setWidth = function(t) {
    this.radius(t / 2)
  }, mi.prototype.setHeight = function(t) {
    this.radius(t / 2)
  }, mi);

  function mi() {
    return null !== vi && vi.apply(this, arguments) || this
  }
  yi.prototype.className = "RegularPolygon", yi.prototype._centroid = !0, yi.prototype._attrsAffectingSize = ["radius"], i(yi), w.addGetterSetter(yi, "radius", 0, y()), w.addGetterSetter(yi, "sides", 0, y()), o.mapMethods(yi);
  var _i, Si = 2 * Math.PI,
    bi = (P(xi, _i = de), xi.prototype._sceneFunc = function(t) {
      t.beginPath(), t.arc(0, 0, this.innerRadius(), 0, Si, !1), t.moveTo(this.outerRadius(), 0), t.arc(0, 0, this.outerRadius(), Si, 0, !0), t.closePath(), t.fillStrokeShape(this)
    }, xi.prototype.getWidth = function() {
      return 2 * this.outerRadius()
    }, xi.prototype.getHeight = function() {
      return 2 * this.outerRadius()
    }, xi.prototype.setWidth = function(t) {
      this.outerRadius(t / 2)
    }, xi.prototype.setHeight = function(t) {
      this.outerRadius(t / 2)
    }, xi);

  function xi() {
    return null !== _i && _i.apply(this, arguments) || this
  }
  bi.prototype.className = "Ring", bi.prototype._centroid = !0, bi.prototype._attrsAffectingSize = ["innerRadius", "outerRadius"], i(bi), w.addGetterSetter(bi, "innerRadius", 0, y()), w.addGetterSetter(bi, "outerRadius", 0, y()), o.mapMethods(bi);
  var wi, Ci = (P(Pi, wi = de), Pi.prototype._sceneFunc = function(t) {
    var e = this.animation(),
      i = this.frameIndex(),
      n = 4 * i,
      r = this.animations()[e],
      o = this.frameOffsets(),
      a = r[0 + n],
      s = r[1 + n],
      h = r[2 + n],
      l = r[3 + n],
      d = this.image();
    if ((this.hasFill() || this.hasStroke()) && (t.beginPath(), t.rect(0, 0, h, l), t.closePath(), t.fillStrokeShape(this)), d)
      if (o) {
        var c = o[e],
          p = 2 * i;
        t.drawImage(d, a, s, h, l, c[0 + p], c[1 + p], h, l)
      } else t.drawImage(d, a, s, h, l, 0, 0, h, l)
  }, Pi.prototype._hitFunc = function(t) {
    var e = this.animation(),
      i = this.frameIndex(),
      n = 4 * i,
      r = this.animations()[e],
      o = this.frameOffsets(),
      a = r[2 + n],
      s = r[3 + n];
    if (t.beginPath(), o) {
      var h = o[e],
        l = 2 * i;
      t.rect(h[0 + l], h[1 + l], a, s)
    } else t.rect(0, 0, a, s);
    t.closePath(), t.fillShape(this)
  }, Pi.prototype._useBufferCanvas = function() {
    return (this.hasShadow() || 1 !== this.getAbsoluteOpacity()) && this.hasStroke()
  }, Pi.prototype._setInterval = function() {
    var t = this;
    this.interval = setInterval(function() {
      t._updateIndex()
    }, 1e3 / this.frameRate())
  }, Pi.prototype.start = function() {
    if (!this.isRunning()) {
      var t = this.getLayer();
      this.anim.setLayers(t), this._setInterval(), this.anim.start()
    }
  }, Pi.prototype.stop = function() {
    this.anim.stop(), clearInterval(this.interval)
  }, Pi.prototype.isRunning = function() {
    return this.anim.isRunning()
  }, Pi.prototype._updateIndex = function() {
    var t = this.frameIndex(),
      e = this.animation();
    t < this.animations()[e].length / 4 - 1 ? this.frameIndex(t + 1) : this.frameIndex(0)
  }, Pi);

  function Pi(t) {
    var e = wi.call(this, t) || this;
    return e._updated = !0, e.anim = new Ce(function() {
      var t = e._updated;
      return e._updated = !1, t
    }), e.on("animationChange.konva", function() {
      this.frameIndex(0)
    }), e.on("frameIndexChange.konva", function() {
      this._updated = !0
    }), e.on("frameRateChange.konva", function() {
      this.anim.isRunning() && (clearInterval(this.interval), this._setInterval())
    }), e
  }
  Ci.prototype.className = "Sprite", i(Ci), w.addGetterSetter(Ci, "animation"), w.addGetterSetter(Ci, "animations"), w.addGetterSetter(Ci, "frameOffsets"), w.addGetterSetter(Ci, "image"), w.addGetterSetter(Ci, "frameIndex", 0, y()), w.addGetterSetter(Ci, "frameRate", 17, y()), w.backCompat(Ci, {
    index: "frameIndex",
    getIndex: "getFrameIndex",
    setIndex: "setFrameIndex"
  }), o.mapMethods(Ci);
  var ki, Ti = (P(Ai, ki = de), Ai.prototype._sceneFunc = function(t) {
    var e = this.innerRadius(),
      i = this.outerRadius(),
      n = this.numPoints();
    t.beginPath(), t.moveTo(0, 0 - i);
    for (var r = 1; r < 2 * n; r++) {
      var o = r % 2 == 0 ? i : e,
        a = o * Math.sin(r * Math.PI / n),
        s = -1 * o * Math.cos(r * Math.PI / n);
      t.lineTo(a, s)
    }
    t.closePath(), t.fillStrokeShape(this)
  }, Ai.prototype.getWidth = function() {
    return 2 * this.outerRadius()
  }, Ai.prototype.getHeight = function() {
    return 2 * this.outerRadius()
  }, Ai.prototype.setWidth = function(t) {
    this.outerRadius(t / 2)
  }, Ai.prototype.setHeight = function(t) {
    this.outerRadius(t / 2)
  }, Ai);

  function Ai() {
    return null !== ki && ki.apply(this, arguments) || this
  }
  Ti.prototype.className = "Star", Ti.prototype._centroid = !0, Ti.prototype._attrsAffectingSize = ["innerRadius", "outerRadius"], i(Ti), w.addGetterSetter(Ti, "numPoints", 5, y()), w.addGetterSetter(Ti, "innerRadius", 0, y()), w.addGetterSetter(Ti, "outerRadius", 0, y()), o.mapMethods(Ti);
  var Mi, Gi = "auto",
    Ri = "justify",
    Oi = ["fontFamily", "fontSize", "fontStyle", "fontVariant", "padding", "align", "verticalAlign", "lineHeight", "text", "width", "height", "wrap", "ellipsis", "letterSpacing"],
    Li = Oi.length;

  function Ii() {
    return Mi || (Mi = L.createCanvasElement().getContext("2d"))
  }
  var Ei, Di = (P(Fi, Ei = de), Fi.prototype._sceneFunc = function(t) {
    var e, i = this.padding(),
      n = this.fontSize(),
      r = this.lineHeight() * n,
      o = this.textArr,
      a = o.length,
      s = this.verticalAlign(),
      h = 0,
      l = this.align(),
      d = this.getWidth(),
      c = this.letterSpacing(),
      p = this.fill(),
      u = this.textDecoration(),
      f = -1 !== u.indexOf("underline"),
      g = -1 !== u.indexOf("line-through"),
      v = 0,
      y = (v = r / 2, 0),
      m = 0;
    for (t.setAttr("font", this._getContextFont()), t.setAttr("textBaseline", "middle"), t.setAttr("textAlign", "left"), "middle" === s ? h = (this.getHeight() - a * r - 2 * i) / 2 : "bottom" === s && (h = this.getHeight() - a * r - 2 * i), t.translate(i, h + i), e = 0; e < a; e++) {
      m = y = 0;
      var _, S, b, x = o[e],
        w = x.text,
        C = x.width,
        P = e !== a - 1;
      if (t.save(), "right" === l ? y += d - C - 2 * i : "center" === l && (y += (d - C - 2 * i) / 2), f && (t.save(), t.beginPath(), t.moveTo(y, v + m + Math.round(n / 2)), S = 0 == (_ = w.split(" ").length - 1), b = l === Ri && P && !S ? d - 2 * i : C, t.lineTo(y + Math.round(b), v + m + Math.round(n / 2)), t.lineWidth = n / 15, t.strokeStyle = p, t.stroke(), t.restore()), g && (t.save(), t.beginPath(), t.moveTo(y, v + m), S = 0 == (_ = w.split(" ").length - 1), b = l === Ri && P && !S ? d - 2 * i : C, t.lineTo(y + Math.round(b), v + m), t.lineWidth = n / 15, t.strokeStyle = p, t.stroke(), t.restore()), 0 !== c || l === Ri) {
        _ = w.split(" ").length - 1;
        for (var k = 0; k < w.length; k++) {
          var T = w[k];
          " " === T && e !== a - 1 && l === Ri && (y += Math.floor((d - 2 * i - C) / _)), this._partialTextX = y, this._partialTextY = v + m, this._partialText = T, t.fillStrokeShape(this), y += Math.round(this.measureSize(T).width) + c
        }
      } else this._partialTextX = y, this._partialTextY = v + m, this._partialText = w, t.fillStrokeShape(this);
      t.restore(), 1 < a && (v += r)
    }
  }, Fi.prototype._hitFunc = function(t) {
    var e = this.getWidth(),
      i = this.getHeight();
    t.beginPath(), t.rect(0, 0, e, i), t.closePath(), t.fillStrokeShape(this)
  }, Fi.prototype.setText = function(t) {
    var e = L._isString(t) ? t : null == t ? "" : t + "";
    return this._setAttr("text", e), this
  }, Fi.prototype.getWidth = function() {
    return this.attrs.width === Gi || void 0 === this.attrs.width ? this.getTextWidth() + 2 * this.padding() : this.attrs.width
  }, Fi.prototype.getHeight = function() {
    return this.attrs.height === Gi || void 0 === this.attrs.height ? this.fontSize() * this.textArr.length * this.lineHeight() + 2 * this.padding() : this.attrs.height
  }, Fi.prototype.getTextWidth = function() {
    return this.textWidth
  }, Fi.prototype.getTextHeight = function() {
    return L.warn("text.getTextHeight() method is deprecated. Use text.height() - for full height and text.fontSize() - for one line height."), this.textHeight
  }, Fi.prototype.measureSize = function(t) {
    var e, i = Ii(),
      n = this.fontSize();
    return i.save(), i.font = this._getContextFont(), e = i.measureText(t), i.restore(), {
      width: e.width,
      height: n
    }
  }, Fi.prototype._getContextFont = function() {
    return O.UA.isIE ? this.fontStyle() + " " + this.fontSize() + "px " + this.fontFamily() : this.fontStyle() + " " + this.fontVariant() + " " + this.fontSize() + "px " + this.fontFamily()
  }, Fi.prototype._addTextLine = function(t) {
    this.align() === Ri && (t = t.trim());
    var e = this._getTextWidth(t);
    return this.textArr.push({
      text: t,
      width: e
    })
  }, Fi.prototype._getTextWidth = function(t) {
    var e = this.letterSpacing(),
      i = t.length;
    return Ii().measureText(t).width + (i ? e * (i - 1) : 0)
  }, Fi.prototype._setTextData = function() {
    var t = this.text().split("\n"),
      e = +this.fontSize(),
      i = 0,
      n = this.lineHeight() * e,
      r = this.attrs.width,
      o = this.attrs.height,
      a = r !== Gi && void 0 !== r,
      s = o !== Gi && void 0 !== o,
      h = this.padding(),
      l = r - 2 * h,
      d = o - 2 * h,
      c = 0,
      p = this.wrap(),
      u = "none" !== p,
      f = "char" !== p && u,
      g = this.ellipsis() && !u;
    this.textArr = [], Ii().font = this._getContextFont();
    for (var v = g ? this._getTextWidth("…") : 0, y = 0, m = t.length; y < m; ++y) {
      var _ = t[y],
        S = this._getTextWidth(_);
      if (a && l < S)
        for (; 0 < _.length;) {
          for (var b = 0, x = _.length, w = "", C = 0; b < x;) {
            var P = b + x >>> 1,
              k = _.slice(0, 1 + P),
              T = this._getTextWidth(k) + v;
            T <= l ? (b = 1 + P, w = k + (g ? "…" : ""), C = T) : x = P
          }
          if (!w) break;
          if (f) {
            var A, M = _[w.length];
            0 < (A = (" " === M || "-" === M) && C <= l ? w.length : Math.max(w.lastIndexOf(" "), w.lastIndexOf("-")) + 1) && (b = A, w = w.slice(0, b), C = this._getTextWidth(w))
          }
          if (w = w.trimRight(), this._addTextLine(w), i = Math.max(i, C), c += n, !u || s && d < c + n) break;
          if (0 < (_ = (_ = _.slice(b)).trimLeft()).length && (S = this._getTextWidth(_)) <= l) {
            this._addTextLine(_), c += n, i = Math.max(i, S);
            break
          }
        } else this._addTextLine(_), c += n, i = Math.max(i, S);
      if (s && d < c + n) break
    }
    this.textHeight = e, this.textWidth = i
  }, Fi.prototype.getStrokeScaleEnabled = function() {
    return !0
  }, Fi);

  function Fi(t) {
    var e = Ei.call(this, function(t) {
      return (t = t || {}).fillLinearGradientColorStops || t.fillRadialGradientColorStops || t.fillPatternImage || (t.fill = t.fill || "black"), t
    }(t)) || this;
    e._partialTextX = 0;
    for (var i = e._partialTextY = 0; i < Li; i++) e.on(Oi[i] + "Change.konva", e._setTextData);
    return e._setTextData(), e
  }
  Di.prototype._fillFunc = function(t) {
    t.fillText(this._partialText, this._partialTextX, this._partialTextY)
  }, Di.prototype._strokeFunc = function(t) {
    t.strokeText(this._partialText, this._partialTextX, this._partialTextY)
  }, Di.prototype.className = "Text", Di.prototype._attrsAffectingSize = ["text", "fontSize", "padding", "wrap", "lineHeight"], i(Di), w.overWriteSetter(Di, "width", m()), w.overWriteSetter(Di, "height", m()), w.addGetterSetter(Di, "fontFamily", "Arial"), w.addGetterSetter(Di, "fontSize", 12, y()), w.addGetterSetter(Di, "fontStyle", "normal"), w.addGetterSetter(Di, "fontVariant", "normal"), w.addGetterSetter(Di, "padding", 0, y()), w.addGetterSetter(Di, "align", "left"), w.addGetterSetter(Di, "verticalAlign", "top"), w.addGetterSetter(Di, "lineHeight", 1, y()), w.addGetterSetter(Di, "wrap", "word"), w.addGetterSetter(Di, "ellipsis", !1), w.addGetterSetter(Di, "letterSpacing", 0, y()), w.addGetterSetter(Di, "text", "", _()), w.addGetterSetter(Di, "textDecoration", ""), o.mapMethods(Di);

  function Bi(t) {
    t.fillText(this.partialText, 0, 0)
  }

  function zi(t) {
    t.strokeText(this.partialText, 0, 0)
  }
  var Ni, Wi = (P(Hi, Ni = de), Hi.prototype._sceneFunc = function(t) {
    t.setAttr("font", this._getContextFont()), t.setAttr("textBaseline", this.textBaseline()), t.setAttr("textAlign", "left"), t.save();
    var e = this.textDecoration(),
      i = this.fill(),
      n = this.fontSize(),
      r = this.glyphInfo;
    "underline" === e && t.beginPath();
    for (var o = 0; o < r.length; o++) {
      t.save();
      var a = r[o].p0;
      t.translate(a.x, a.y), t.rotate(r[o].rotation), this.partialText = r[o].text, t.fillStrokeShape(this), "underline" === e && (0 === o && t.moveTo(0, n / 2 + 1), t.lineTo(n, n / 2 + 1)), t.restore()
    }
    "underline" === e && (t.strokeStyle = i, t.lineWidth = n / 20, t.stroke()), t.restore()
  }, Hi.prototype._hitFunc = function(t) {
    t.beginPath();
    var e = this.glyphInfo;
    if (1 <= e.length) {
      var i = e[0].p0;
      t.moveTo(i.x, i.y)
    }
    for (var n = 0; n < e.length; n++) {
      var r = e[n].p1;
      t.lineTo(r.x, r.y)
    }
    t.setAttr("lineWidth", this.fontSize()), t.setAttr("strokeStyle", this.colorKey), t.stroke()
  }, Hi.prototype.getTextWidth = function() {
    return this.textWidth
  }, Hi.prototype.getTextHeight = function() {
    return L.warn("text.getTextHeight() method is deprecated. Use text.height() - for full height and text.fontSize() - for one line height."), this.textHeight
  }, Hi.prototype.setText = function(t) {
    return Di.prototype.setText.call(this, t)
  }, Hi.prototype._getContextFont = function() {
    return Di.prototype._getContextFont.call(this)
  }, Hi.prototype._getTextSize = function(t) {
    var e = this.dummyCanvas.getContext("2d");
    e.save(), e.font = this._getContextFont();
    var i = e.measureText(t);
    return e.restore(), {
      width: i.width,
      height: parseInt(this.attrs.fontSize, 10)
    }
  }, Hi.prototype._setTextData = function() {
    var l = this,
      t = this._getTextSize(this.attrs.text),
      d = this.letterSpacing(),
      c = this.align(),
      e = this.kerningFunc();
    this.textWidth = t.width, this.textHeight = t.height;
    var p = Math.max(this.textWidth + ((this.attrs.text || "").length - 1) * d, 0);
    this.glyphInfo = [];
    for (var u = 0, i = 0; i < l.dataArray.length; i++) 0 < l.dataArray[i].pathLength && (u += l.dataArray[i].pathLength);
    var n = 0;
    "center" === c && (n = Math.max(0, u / 2 - p / 2)), "right" === c && (n = Math.max(0, u - p));
    for (var f, g, v, r = this.text().split(""), y = this.text().split(" ").length - 1, o = -1, m = 0, _ = function() {
        m = 0;
        for (var t = l.dataArray, e = o + 1; e < t.length; e++) {
          if (0 < t[e].pathLength) return t[o = e];
          "M" === t[e].command && (f = {
            x: t[e].points[0],
            y: t[e].points[1]
          })
        }
        return {}
      }, a = function(t) {
        var e = l._getTextSize(t).width + d;
        " " === t && "justify" === c && (e += (u - p) / y);
        var i = 0,
          n = 0;
        for (g = void 0; .01 < Math.abs(e - i) / e && n < 25;) {
          n++;
          for (var r = i; void 0 === v;)(v = _()) && r + v.pathLength < e && (r += v.pathLength, v = void 0);
          if (v === {} || void 0 === f) return;
          var o = !1;
          switch (v.command) {
            case "L":
              ci.getLineLength(f.x, f.y, v.points[0], v.points[1]) > e ? g = ci.getPointOnLine(e, f.x, f.y, v.points[0], v.points[1], f.x, f.y) : v = void 0;
              break;
            case "A":
              var a = v.points[4],
                s = v.points[5],
                h = v.points[4] + s;
              0 === m ? m = a + 1e-8 : i < e ? m += Math.PI / 180 * s / Math.abs(s) : m -= Math.PI / 360 * s / Math.abs(s), (s < 0 && m < h || 0 <= s && h < m) && (m = h, o = !0), g = ci.getPointOnEllipticalArc(v.points[0], v.points[1], v.points[2], v.points[3], m, v.points[6]);
              break;
            case "C":
              0 === m ? m = e > v.pathLength ? 1e-8 : e / v.pathLength : i < e ? m += (e - i) / v.pathLength : m -= (i - e) / v.pathLength, 1 < m && (m = 1, o = !0), g = ci.getPointOnCubicBezier(m, v.start.x, v.start.y, v.points[0], v.points[1], v.points[2], v.points[3], v.points[4], v.points[5]);
              break;
            case "Q":
              0 === m ? m = e / v.pathLength : i < e ? m += (e - i) / v.pathLength : m -= (i - e) / v.pathLength, 1 < m && (m = 1, o = !0), g = ci.getPointOnQuadraticBezier(m, v.start.x, v.start.y, v.points[0], v.points[1], v.points[2], v.points[3])
          }
          void 0 !== g && (i = ci.getLineLength(f.x, f.y, g.x, g.y)), o && (o = !1, v = void 0)
        }
      }, s = n / (l._getTextSize("C").width + d) - 1, h = 0; h < s && (a("C"), void 0 !== f && void 0 !== g); h++) f = g;
    for (var S = 0; S < r.length && (a(r[S]), void 0 !== f && void 0 !== g); S++) {
      var b = ci.getLineLength(f.x, f.y, g.x, g.y),
        x = 0;
      if (e) try {
        x = e(r[S - 1], r[S]) * this.fontSize()
      } catch (t) {
        x = 0
      }
      f.x += x, g.x += x, this.textWidth += x;
      var w = ci.getPointOnLine(x + b / 2, f.x, f.y, g.x, g.y),
        C = Math.atan2(g.y - f.y, g.x - f.x);
      this.glyphInfo.push({
        transposeX: w.x,
        transposeY: w.y,
        text: r[S],
        rotation: C,
        p0: f,
        p1: g
      }), f = g
    }
  }, Hi.prototype.getSelfRect = function() {
    if (!this.glyphInfo.length) return {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    };
    var e = [];
    this.glyphInfo.forEach(function(t) {
      e.push(t.p0.x), e.push(t.p0.y), e.push(t.p1.x), e.push(t.p1.y)
    });
    for (var t, i, n = e[0] || 0, r = e[0] || 0, o = e[1] || 0, a = e[1] || 0, s = 0; s < e.length / 2; s++) t = e[2 * s], i = e[2 * s + 1], n = Math.min(n, t), r = Math.max(r, t), o = Math.min(o, i), a = Math.max(a, i);
    var h = this.fontSize();
    return {
      x: n - h / 2,
      y: o - h / 2,
      width: r - n + h,
      height: a - o + h
    }
  }, Hi);

  function Hi(t) {
    var e = Ni.call(this, t) || this;
    return e.dummyCanvas = L.createCanvasElement(), e.dataArray = [], e.dataArray = ci.parsePathData(e.attrs.data), e.on("dataChange.konva", function() {
      this.dataArray = ci.parsePathData(this.attrs.data), this._setTextData()
    }), e.on("textChange.konva alignChange.konva letterSpacingChange.konva kerningFuncChange.konva", e._setTextData), t && t.getKerning && (L.warn('getKerning TextPath API is deprecated. Please use "kerningFunc" instead.'), e.kerningFunc(t.getKerning)), e._setTextData(), e
  }
  Wi.prototype._fillFunc = Bi, Wi.prototype._strokeFunc = zi, Wi.prototype._fillFuncHit = Bi, Wi.prototype._strokeFuncHit = zi, Wi.prototype.className = "TextPath", Wi.prototype._attrsAffectingSize = ["text", "fontSize", "data"], i(Wi), w.addGetterSetter(Wi, "data"), w.addGetterSetter(Wi, "fontFamily", "Arial"), w.addGetterSetter(Wi, "fontSize", 12, y()), w.addGetterSetter(Wi, "fontStyle", "normal"), w.addGetterSetter(Wi, "align", "left"), w.addGetterSetter(Wi, "letterSpacing", 0, y()), w.addGetterSetter(Wi, "textBaseline", "middle"), w.addGetterSetter(Wi, "fontVariant", "normal"), w.addGetterSetter(Wi, "text", ""), w.addGetterSetter(Wi, "textDecoration", null), w.addGetterSetter(Wi, "kerningFunc", null), o.mapMethods(Wi);
  var Yi = "tr-konva",
    Xi = ["resizeEnabledChange", "rotateAnchorOffsetChange", "rotateEnabledChange", "enabledAnchorsChange", "anchorSizeChange", "borderEnabledChange", "borderStrokeChange", "borderStrokeWidthChange", "borderDashChange", "anchorStrokeChange", "anchorStrokeWidthChange", "anchorFillChange", "anchorCornerRadiusChange", "ignoreStrokeChange"].map(function(t) {
      return t + "." + Yi
    }).join(" "),
    ji = "nodeRect",
    Ui = ["widthChange", "heightChange", "scaleXChange", "scaleYChange", "skewXChange", "skewYChange", "rotationChange", "offsetXChange", "offsetYChange", "transformsEnabledChange", "strokeWidthChange"].map(function(t) {
      return t + "." + Yi
    }).join(" "),
    qi = {
      "top-left": -45,
      "top-center": 0,
      "top-right": 45,
      "middle-right": -90,
      "middle-left": 90,
      "bottom-left": -135,
      "bottom-center": 180,
      "bottom-right": 135
    },
    Vi = "ontouchstart" in O._global;
  var Ki, Qi = ["top-left", "top-center", "top-right", "middle-right", "middle-left", "bottom-left", "bottom-center", "bottom-right"],
    Ji = (P(Zi, Ki = be), Zi.prototype.attachTo = function(t) {
      return this.setNode(t), this
    }, Zi.prototype.setNode = function(t) {
      var e = this;

      function i() {
        e._resetTransformCache(), e._transforming || e.update()
      }
      this._node && this.detach(), this._node = t, this._resetTransformCache();
      var n = t._attrsAffectingSize.map(function(t) {
        return t + "Change." + Yi
      }).join(" ");
      return t.on(n, i), t.on(Ui, i), t.on("xChange." + Yi + " yChange." + Yi, function() {
        return e._resetTransformCache()
      }), this.findOne(".top-left") && this.update(), this
    }, Zi.prototype.getNode = function() {
      return this._node
    }, Zi.prototype.getActiveAnchor = function() {
      return this._movingAnchorName
    }, Zi.prototype.detach = function() {
      this.getNode() && (this.getNode().off("." + Yi), this._node = void 0), this._resetTransformCache()
    }, Zi.prototype._resetTransformCache = function() {
      this._clearCache(ji), this._clearCache("transform"), this._clearSelfAndDescendantCache("absoluteTransform")
    }, Zi.prototype._getNodeRect = function() {
      return this._getCache(ji, this.__getNodeRect)
    }, Zi.prototype.__getNodeRect = function() {
      var t = this.getNode();
      if (!t) return {
        x: -1e8,
        y: -1e8,
        width: 0,
        height: 0,
        rotation: 0
      };
      t.parent && this.parent && t.parent !== this.parent && L.warn("Transformer and attached node have different parents. Konva does not support such case right now. Please move Transformer to the parent of attaching node.");
      var e = t.getClientRect({
          skipTransform: !0,
          skipShadow: !0,
          skipStroke: this.ignoreStroke()
        }),
        i = O.getAngle(t.rotation()),
        n = e.x * t.scaleX() - t.offsetX() * t.scaleX(),
        r = e.y * t.scaleY() - t.offsetY() * t.scaleY();
      return {
        x: t.x() + n * Math.cos(i) + r * Math.sin(-i),
        y: t.y() + r * Math.cos(i) + n * Math.sin(i),
        width: e.width * t.scaleX(),
        height: e.height * t.scaleY(),
        rotation: t.rotation()
      }
    }, Zi.prototype.getX = function() {
      return this._getNodeRect().x
    }, Zi.prototype.getY = function() {
      return this._getNodeRect().y
    }, Zi.prototype.getRotation = function() {
      return this._getNodeRect().rotation
    }, Zi.prototype.getWidth = function() {
      return this._getNodeRect().width
    }, Zi.prototype.getHeight = function() {
      return this._getNodeRect().height
    }, Zi.prototype._createElements = function() {
      this._createBack(), Qi.forEach(function(t) {
        this._createAnchor(t)
      }.bind(this)), this._createAnchor("rotater")
    }, Zi.prototype._createAnchor = function(r) {
      var o = this,
        a = new fi({
          stroke: "rgb(0, 161, 255)",
          fill: "white",
          strokeWidth: 1,
          name: r + " _anchor",
          dragDistance: 0,
          draggable: !0,
          hitStrokeWidth: Vi ? 10 : "auto"
        }),
        e = this;
      a.on("mousedown touchstart", function(t) {
        e._handleMouseDown(t)
      }), a.on("dragstart", function(t) {
        t.cancelBubble = !0
      }), a.on("dragmove", function(t) {
        t.cancelBubble = !0
      }), a.on("dragend", function(t) {
        t.cancelBubble = !0
      }), a.on("mouseenter", function() {
        var t = O.getAngle(o.getAbsoluteRotation()),
          e = o.getNode().getAbsoluteScale(),
          i = e.y * e.x < 0,
          n = function(t, e, i) {
            if ("rotater" === t) return "crosshair";
            e += L._degToRad(qi[t] || 0), i && (e *= -1);
            var n = (L._radToDeg(e) % 360 + 360) % 360;
            return L._inRange(n, 337.5, 360) || L._inRange(n, 0, 22.5) ? "ns-resize" : L._inRange(n, 22.5, 67.5) ? "nesw-resize" : L._inRange(n, 67.5, 112.5) ? "ew-resize" : L._inRange(n, 112.5, 157.5) ? "nwse-resize" : L._inRange(n, 157.5, 202.5) ? "ns-resize" : L._inRange(n, 202.5, 247.5) ? "nesw-resize" : L._inRange(n, 247.5, 292.5) ? "ew-resize" : L._inRange(n, 292.5, 337.5) ? "nwse-resize" : (L.error("Transformer has unknown angle for cursor detection: " + n), "pointer")
          }(r, t, i);
        a.getStage().content.style.cursor = n, o._cursorChange = !0
      }), a.on("mouseout", function() {
        a.getStage() && a.getParent() && (a.getStage().content.style.cursor = "", o._cursorChange = !1)
      }), this.add(a)
    }, Zi.prototype._createBack = function() {
      var t = new de({
        name: "back",
        width: 0,
        height: 0,
        listening: !1,
        sceneFunc: function(t) {
          var e = this.getParent(),
            i = e.padding();
          t.beginPath(), t.rect(-i, -i, this.width() + 2 * i, this.height() + 2 * i), t.moveTo(this.width() / 2, -i), e.rotateEnabled() && t.lineTo(this.width() / 2, -e.rotateAnchorOffset() * L._sign(this.height()) - i), t.fillStrokeShape(this)
        }
      });
      this.add(t)
    }, Zi.prototype._handleMouseDown = function(t) {
      this._movingAnchorName = t.target.name().split(" ")[0];
      var e = this._getNodeRect(),
        i = e.width,
        n = e.height,
        r = Math.sqrt(Math.pow(i, 2) + Math.pow(n, 2));
      this.sin = Math.abs(n / r), this.cos = Math.abs(i / r), window.addEventListener("mousemove", this._handleMouseMove), window.addEventListener("touchmove", this._handleMouseMove), window.addEventListener("mouseup", this._handleMouseUp, !0), window.addEventListener("touchend", this._handleMouseUp, !0), this._transforming = !0, this._fire("transformstart", {
        evt: t,
        target: this.getNode()
      }), this.getNode()._fire("transformstart", {
        evt: t,
        target: this.getNode()
      })
    }, Zi.prototype._handleMouseMove = function(t) {
      var e, i, n, r = this.findOne("." + this._movingAnchorName),
        o = r.getStage();
      o.setPointersPositions(t), r.setAbsolutePosition(o.getPointerPosition());
      var a = this.keepRatio() || t.shiftKey,
        s = this.padding();
      if ("top-left" === this._movingAnchorName) {
        if (a) {
          n = Math.sqrt(Math.pow(this.findOne(".bottom-right").x() - r.x() - 2 * s, 2) + Math.pow(this.findOne(".bottom-right").y() - r.y() - 2 * s, 2));
          var h = this.findOne(".top-left").x() > this.findOne(".bottom-right").x() ? -1 : 1,
            l = this.findOne(".top-left").y() > this.findOne(".bottom-right").y() ? -1 : 1;
          e = n * this.cos * h, i = n * this.sin * l, this.findOne(".top-left").x(this.findOne(".bottom-right").x() - e - 2 * s), this.findOne(".top-left").y(this.findOne(".bottom-right").y() - i - 2 * s)
        }
      } else if ("top-center" === this._movingAnchorName) this.findOne(".top-left").y(r.y());
      else if ("top-right" === this._movingAnchorName) {
        a && (n = Math.sqrt(Math.pow(r.x() - this.findOne(".bottom-left").x() - 2 * s, 2) + Math.pow(this.findOne(".bottom-left").y() - r.y() - 2 * s, 2)), h = this.findOne(".top-right").x() < this.findOne(".top-left").x() ? -1 : 1, l = this.findOne(".top-right").y() > this.findOne(".bottom-left").y() ? -1 : 1, e = n * this.cos * h, i = n * this.sin * l, this.findOne(".top-right").x(e + s), this.findOne(".top-right").y(this.findOne(".bottom-left").y() - i - 2 * s));
        var d = r.position();
        this.findOne(".top-left").y(d.y), this.findOne(".bottom-right").x(d.x)
      } else if ("middle-left" === this._movingAnchorName) this.findOne(".top-left").x(r.x());
      else if ("middle-right" === this._movingAnchorName) this.findOne(".bottom-right").x(r.x());
      else if ("bottom-left" === this._movingAnchorName) a && (n = Math.sqrt(Math.pow(this.findOne(".top-right").x() - r.x() - 2 * s, 2) + Math.pow(r.y() - this.findOne(".top-right").y() - 2 * s, 2)), h = this.findOne(".top-right").x() < this.findOne(".bottom-left").x() ? -1 : 1, l = this.findOne(".bottom-right").y() < this.findOne(".top-left").y() ? -1 : 1, e = n * this.cos * h, i = n * this.sin * l, this.findOne(".bottom-left").x(this.findOne(".top-right").x() - e - 2 * s), this.findOne(".bottom-left").y(i + s)), d = r.position(), this.findOne(".top-left").x(d.x), this.findOne(".bottom-right").y(d.y);
      else if ("bottom-center" === this._movingAnchorName) this.findOne(".bottom-right").y(r.y());
      else if ("bottom-right" === this._movingAnchorName) a && (n = Math.sqrt(Math.pow(this.findOne(".bottom-right").x() - s, 2) + Math.pow(this.findOne(".bottom-right").y() - s, 2)), h = this.findOne(".top-left").x() > this.findOne(".bottom-right").x() ? -1 : 1, l = this.findOne(".top-left").y() > this.findOne(".bottom-right").y() ? -1 : 1, e = n * this.cos * h, i = n * this.sin * l, this.findOne(".bottom-right").x(e + s), this.findOne(".bottom-right").y(i + s));
      else if ("rotater" === this._movingAnchorName) {
        var c = this._getNodeRect();
        e = r.x() - c.width / 2, i = -r.y() + c.height / 2;
        var p = Math.atan2(-i, e) + Math.PI / 2;
        c.height < 0 && (p -= Math.PI);
        for (var u = O.getAngle(this.rotation()), f = L._radToDeg(u) + L._radToDeg(p), g = O.getAngle(this.getNode().rotation()), v = L._degToRad(f), y = this.rotationSnaps(), m = O.getAngle(this.rotationSnapTolerance()), _ = 0; _ < y.length; _++) {
          var S = O.getAngle(y[_]);
          Math.abs(S - L._degToRad(f)) % (2 * Math.PI) < m && (f = L._radToDeg(S), v = L._degToRad(f))
        }
        var b = s,
          x = s;
        this._fitNodeInto({
          rotation: O.angleDeg ? f : L._degToRad(f),
          x: c.x + (c.width / 2 + s) * (Math.cos(g) - Math.cos(v)) + (c.height / 2 + s) * (Math.sin(-g) - Math.sin(-v)) - (b * Math.cos(u) + x * Math.sin(-u)),
          y: c.y + (c.height / 2 + s) * (Math.cos(g) - Math.cos(v)) + (c.width / 2 + s) * (Math.sin(g) - Math.sin(v)) - (x * Math.cos(u) + b * Math.sin(u)),
          width: c.width + 2 * s,
          height: c.height + 2 * s
        }, t)
      } else console.error(new Error("Wrong position argument of selection resizer: " + this._movingAnchorName));
      if ("rotater" !== this._movingAnchorName) {
        if (this.centeredScaling() || t.altKey) {
          var w = this.findOne(".top-left"),
            C = this.findOne(".bottom-right"),
            P = w.x() + s,
            k = w.y() + s,
            T = this.getWidth() - C.x() + s,
            A = this.getHeight() - C.y() + s;
          C.move({
            x: -P,
            y: -k
          }), w.move({
            x: T,
            y: A
          })
        }
        var M = this.findOne(".top-left").getAbsolutePosition(this.getParent());
        e = M.x, i = M.y;
        var G = this.findOne(".bottom-right").x() - this.findOne(".top-left").x(),
          R = this.findOne(".bottom-right").y() - this.findOne(".top-left").y();
        this._fitNodeInto({
          x: e + this.offsetX(),
          y: i + this.offsetY(),
          width: G,
          height: R
        }, t)
      }
    }, Zi.prototype._handleMouseUp = function(t) {
      this._removeEvents(t)
    }, Zi.prototype._removeEvents = function(t) {
      if (this._transforming) {
        this._transforming = !1, window.removeEventListener("mousemove", this._handleMouseMove), window.removeEventListener("touchmove", this._handleMouseMove), window.removeEventListener("mouseup", this._handleMouseUp, !0), window.removeEventListener("touchend", this._handleMouseUp, !0);
        var e = this.getNode();
        this._fire("transformend", {
          evt: t,
          target: e
        }), e && e.fire("transformend", {
          evt: t,
          target: e
        }), this._movingAnchorName = null
      }
    }, Zi.prototype._fitNodeInto = function(t, e) {
      var i = this.boundBoxFunc();
      if (i) {
        var n = this._getNodeRect();
        t = i.call(this, n, t)
      }
      var r = this.getNode();
      void 0 !== t.rotation && this.getNode().rotation(t.rotation);
      var o = r.getClientRect({
          skipTransform: !0,
          skipShadow: !0,
          skipStroke: this.ignoreStroke()
        }),
        a = this.padding(),
        s = o.width ? (t.width - 2 * a) / o.width : 1,
        h = o.height ? (t.height - 2 * a) / o.height : 1,
        l = O.getAngle(r.rotation()),
        d = o.x * s - a - r.offsetX() * s,
        c = o.y * h - a - r.offsetY() * h;
      this.getNode().setAttrs({
        scaleX: s,
        scaleY: h,
        x: t.x - (d * Math.cos(l) + c * Math.sin(-l)),
        y: t.y - (c * Math.cos(l) + d * Math.sin(l))
      }), this._fire("transform", {
        evt: e,
        target: this.getNode()
      }), this.getNode()._fire("transform", {
        evt: e,
        target: this.getNode()
      }), this.update(), this.getLayer().batchDraw()
    }, Zi.prototype.forceUpdate = function() {
      this._resetTransformCache(), this.update()
    }, Zi.prototype.update = function() {
      var e = this,
        t = this._getNodeRect(),
        i = this.getNode(),
        n = {
          x: 1,
          y: 1
        };
      i && i.getParent() && (n = i.getParent().getAbsoluteScale());
      var r = {
          x: 1 / n.x,
          y: 1 / n.y
        },
        o = t.width,
        a = t.height,
        s = this.enabledAnchors(),
        h = this.resizeEnabled(),
        l = this.padding(),
        d = this.anchorSize();
      this.find("._anchor").each(function(t) {
        return t.setAttrs({
          width: d,
          height: d,
          offsetX: d / 2,
          offsetY: d / 2,
          stroke: e.anchorStroke(),
          strokeWidth: e.anchorStrokeWidth(),
          fill: e.anchorFill(),
          cornerRadius: e.anchorCornerRadius()
        })
      }), this.findOne(".top-left").setAttrs({
        x: -l,
        y: -l,
        scale: r,
        visible: h && 0 <= s.indexOf("top-left")
      }), this.findOne(".top-center").setAttrs({
        x: o / 2,
        y: -l,
        scale: r,
        visible: h && 0 <= s.indexOf("top-center")
      }), this.findOne(".top-right").setAttrs({
        x: o + l,
        y: -l,
        scale: r,
        visible: h && 0 <= s.indexOf("top-right")
      }), this.findOne(".middle-left").setAttrs({
        x: -l,
        y: a / 2,
        scale: r,
        visible: h && 0 <= s.indexOf("middle-left")
      }), this.findOne(".middle-right").setAttrs({
        x: o + l,
        y: a / 2,
        scale: r,
        visible: h && 0 <= s.indexOf("middle-right")
      }), this.findOne(".bottom-left").setAttrs({
        x: -l,
        y: a + l,
        scale: r,
        visible: h && 0 <= s.indexOf("bottom-left")
      }), this.findOne(".bottom-center").setAttrs({
        x: o / 2,
        y: a + l,
        scale: r,
        visible: h && 0 <= s.indexOf("bottom-center")
      }), this.findOne(".bottom-right").setAttrs({
        x: o + l,
        y: a + l,
        scale: r,
        visible: h && 0 <= s.indexOf("bottom-right")
      });
      var c = -this.rotateAnchorOffset() * Math.abs(r.y);
      this.findOne(".rotater").setAttrs({
        x: o / 2,
        y: c * L._sign(a) - l,
        scale: r,
        visible: this.rotateEnabled()
      }), this.findOne(".back").setAttrs({
        width: o * n.x,
        height: a * n.y,
        scale: r,
        visible: this.borderEnabled(),
        stroke: this.borderStroke(),
        strokeWidth: this.borderStrokeWidth(),
        dash: this.borderDash()
      })
    }, Zi.prototype.isTransforming = function() {
      return this._transforming
    }, Zi.prototype.stopTransform = function() {
      if (this._transforming) {
        this._removeEvents();
        var t = this.findOne("." + this._movingAnchorName);
        t && t.stopDrag()
      }
    }, Zi.prototype.destroy = function() {
      return this.getStage() && this._cursorChange && (this.getStage().content.style.cursor = ""), be.prototype.destroy.call(this), this.detach(), this._removeEvents(), this
    }, Zi.prototype.toObject = function() {
      return dt.prototype.toObject.call(this)
    }, Zi);

  function Zi(t) {
    var e = Ki.call(this, t) || this;
    return e._transforming = !1, e._createElements(), e._handleMouseMove = e._handleMouseMove.bind(e), e._handleMouseUp = e._handleMouseUp.bind(e), e.update = e.update.bind(e), e.on(Xi, e.update), e.getNode() && e.update(), e
  }
  Ji.prototype.className = "Transformer", i(Ji), w.addGetterSetter(Ji, "enabledAnchors", Qi, function(t) {
    return t instanceof Array || L.warn("enabledAnchors value should be an array"), t instanceof Array && t.forEach(function(t) {
      -1 === Qi.indexOf(t) && L.warn("Unknown anchor name: " + t + ". Available names are: " + Qi.join(", "))
    }), t || []
  }), w.addGetterSetter(Ji, "resizeEnabled", !0), w.addGetterSetter(Ji, "anchorSize", 10, y()), w.addGetterSetter(Ji, "rotateEnabled", !0), w.addGetterSetter(Ji, "rotationSnaps", []), w.addGetterSetter(Ji, "rotateAnchorOffset", 50, y()), w.addGetterSetter(Ji, "rotationSnapTolerance", 5, y()), w.addGetterSetter(Ji, "borderEnabled", !0), w.addGetterSetter(Ji, "anchorStroke", "rgb(0, 161, 255)"), w.addGetterSetter(Ji, "anchorStrokeWidth", 1, y()), w.addGetterSetter(Ji, "anchorFill", "white"), w.addGetterSetter(Ji, "anchorCornerRadius", 0, y()), w.addGetterSetter(Ji, "borderStroke", "rgb(0, 161, 255)"), w.addGetterSetter(Ji, "borderStrokeWidth", 1, y()), w.addGetterSetter(Ji, "borderDash"), w.addGetterSetter(Ji, "keepRatio", !0), w.addGetterSetter(Ji, "centeredScaling", !1), w.addGetterSetter(Ji, "ignoreStroke", !1), w.addGetterSetter(Ji, "padding", 0, y()), w.addGetterSetter(Ji, "node"), w.addGetterSetter(Ji, "boundBoxFunc"), w.backCompat(Ji, {
    lineEnabled: "borderEnabled",
    rotateHandlerOffset: "rotateAnchorOffset",
    enabledHandlers: "enabledAnchors"
  }), o.mapMethods(Ji);
  var $i, tn = (P(en, $i = de), en.prototype._sceneFunc = function(t) {
    t.beginPath(), t.arc(0, 0, this.radius(), 0, O.getAngle(this.angle()), this.clockwise()), t.lineTo(0, 0), t.closePath(), t.fillStrokeShape(this)
  }, en.prototype.getWidth = function() {
    return 2 * this.radius()
  }, en.prototype.getHeight = function() {
    return 2 * this.radius()
  }, en.prototype.setWidth = function(t) {
    this.radius(t / 2)
  }, en.prototype.setHeight = function(t) {
    this.radius(t / 2)
  }, en);

  function en() {
    return null !== $i && $i.apply(this, arguments) || this
  }

  function nn() {
    this.r = 0, this.g = 0, this.b = 0, this.a = 0, this.next = null
  }
  tn.prototype.className = "Wedge", tn.prototype._centroid = !0, tn.prototype._attrsAffectingSize = ["radius"], i(tn), w.addGetterSetter(tn, "radius", 0, y()), w.addGetterSetter(tn, "angle", 0, y()), w.addGetterSetter(tn, "clockwise", !1), w.backCompat(tn, {
    angleDeg: "angle",
    getAngleDeg: "getAngle",
    setAngleDeg: "setAngle"
  }), o.mapMethods(tn);
  var rn = [512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388, 335, 292, 512, 454, 405, 364, 328, 298, 271, 496, 456, 420, 388, 360, 335, 312, 292, 273, 512, 482, 454, 428, 405, 383, 364, 345, 328, 312, 298, 284, 271, 259, 496, 475, 456, 437, 420, 404, 388, 374, 360, 347, 335, 323, 312, 302, 292, 282, 273, 265, 512, 497, 482, 468, 454, 441, 428, 417, 405, 394, 383, 373, 364, 354, 345, 337, 328, 320, 312, 305, 298, 291, 284, 278, 271, 265, 259, 507, 496, 485, 475, 465, 456, 446, 437, 428, 420, 412, 404, 396, 388, 381, 374, 367, 360, 354, 347, 341, 335, 329, 323, 318, 312, 307, 302, 297, 292, 287, 282, 278, 273, 269, 265, 261, 512, 505, 497, 489, 482, 475, 468, 461, 454, 447, 441, 435, 428, 422, 417, 411, 405, 399, 394, 389, 383, 378, 373, 368, 364, 359, 354, 350, 345, 341, 337, 332, 328, 324, 320, 316, 312, 309, 305, 301, 298, 294, 291, 287, 284, 281, 278, 274, 271, 268, 265, 262, 259, 257, 507, 501, 496, 491, 485, 480, 475, 470, 465, 460, 456, 451, 446, 442, 437, 433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388, 385, 381, 377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344, 341, 338, 335, 332, 329, 326, 323, 320, 318, 315, 312, 310, 307, 304, 302, 299, 297, 294, 292, 289, 287, 285, 282, 280, 278, 275, 273, 271, 269, 267, 265, 263, 261, 259],
    on = [9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24];
  w.addGetterSetter(dt, "blurRadius", 0, y(), w.afterSetFilter);
  w.addGetterSetter(dt, "brightness", 0, y(), w.afterSetFilter);
  w.addGetterSetter(dt, "contrast", 0, y(), w.afterSetFilter);

  function an(t, e, i, n, r) {
    var o = i - e,
      a = r - n;
    return 0 == o ? n + a / 2 : 0 == a ? n : a * ((t - e) / o) + n
  }
  w.addGetterSetter(dt, "embossStrength", .5, y(), w.afterSetFilter), w.addGetterSetter(dt, "embossWhiteLevel", .5, y(), w.afterSetFilter), w.addGetterSetter(dt, "embossDirection", "top-left", null, w.afterSetFilter), w.addGetterSetter(dt, "embossBlend", !1, null, w.afterSetFilter);
  w.addGetterSetter(dt, "enhance", 0, y(), w.afterSetFilter);
  w.addGetterSetter(dt, "hue", 0, y(), w.afterSetFilter), w.addGetterSetter(dt, "saturation", 0, y(), w.afterSetFilter), w.addGetterSetter(dt, "luminance", 0, y(), w.afterSetFilter);
  w.addGetterSetter(dt, "hue", 0, y(), w.afterSetFilter), w.addGetterSetter(dt, "saturation", 0, y(), w.afterSetFilter), w.addGetterSetter(dt, "value", 0, y(), w.afterSetFilter);

  function sn(t, e, i) {
    var n = 4 * (i * t.width + e),
      r = [];
    return r.push(t.data[n++], t.data[n++], t.data[n++], t.data[n++]), r
  }

  function hn(t, e) {
    return Math.sqrt(Math.pow(t[0] - e[0], 2) + Math.pow(t[1] - e[1], 2) + Math.pow(t[2] - e[2], 2))
  }

  function ln(t, e) {
    var i = sn(t, 0, 0),
      n = sn(t, t.width - 1, 0),
      r = sn(t, 0, t.height - 1),
      o = sn(t, t.width - 1, t.height - 1),
      a = e || 10;
    if (hn(i, n) < a && hn(n, o) < a && hn(o, r) < a && hn(r, i) < a) {
      for (var s = function(t) {
          for (var e = [0, 0, 0], i = 0; i < t.length; i++) e[0] += t[i][0], e[1] += t[i][1], e[2] += t[i][2];
          return e[0] /= t.length, e[1] /= t.length, e[2] /= t.length, e
        }([n, i, o, r]), h = [], l = 0; l < t.width * t.height; l++) {
        var d = hn(s, [t.data[4 * l], t.data[4 * l + 1], t.data[4 * l + 2]]);
        h[l] = d < a ? 0 : 255
      }
      return h
    }
  }
  w.addGetterSetter(dt, "kaleidoscopePower", 2, y(), w.afterSetFilter), w.addGetterSetter(dt, "kaleidoscopeAngle", 0, y(), w.afterSetFilter);
  w.addGetterSetter(dt, "threshold", 0, y(), w.afterSetFilter);
  w.addGetterSetter(dt, "noise", .2, y(), w.afterSetFilter);
  w.addGetterSetter(dt, "pixelSize", 8, y(), w.afterSetFilter);
  w.addGetterSetter(dt, "levels", .5, y(), w.afterSetFilter);
  w.addGetterSetter(dt, "red", 0, function(t) {
    return this._filterUpToDate = !1, 255 < t ? 255 : t < 0 ? 0 : Math.round(t)
  }), w.addGetterSetter(dt, "green", 0, function(t) {
    return this._filterUpToDate = !1, 255 < t ? 255 : t < 0 ? 0 : Math.round(t)
  }), w.addGetterSetter(dt, "blue", 0, v, w.afterSetFilter);
  w.addGetterSetter(dt, "red", 0, function(t) {
    return this._filterUpToDate = !1, 255 < t ? 255 : t < 0 ? 0 : Math.round(t)
  }), w.addGetterSetter(dt, "green", 0, function(t) {
    return this._filterUpToDate = !1, 255 < t ? 255 : t < 0 ? 0 : Math.round(t)
  }), w.addGetterSetter(dt, "blue", 0, v, w.afterSetFilter), w.addGetterSetter(dt, "alpha", 1, function(t) {
    return this._filterUpToDate = !1, 1 < t ? 1 : t < 0 ? 0 : t
  });
  return w.addGetterSetter(dt, "threshold", .5, y(), w.afterSetFilter), Ee.Util._assign(Ee, {
    Arc: De,
    Arrow: He,
    Circle: je,
    Ellipse: Ve,
    Image: Je,
    Label: oi,
    Tag: hi,
    Line: ze,
    Path: ci,
    Rect: fi,
    RegularPolygon: yi,
    Ring: bi,
    Sprite: Ci,
    Star: Ti,
    Text: Di,
    TextPath: Wi,
    Transformer: Ji,
    Wedge: tn,
    Filters: {
      Blur: function(t) {
        var e = Math.round(this.blurRadius());
        0 < e && function(t, e) {
          var i, n, r, o, a, s, h, l, d, c, p, u, f, g, v, y, m, _, S, b, x, w, C, P, k = t.data,
            T = t.width,
            A = t.height,
            M = e + e + 1,
            G = T - 1,
            R = A - 1,
            O = e + 1,
            L = O * (O + 1) / 2,
            I = new nn,
            E = null,
            D = I,
            F = null,
            B = null,
            z = rn[e],
            N = on[e];
          for (r = 1; r < M; r++) D = D.next = new nn, r === O && (E = D);
          for (D.next = I, h = s = 0, n = 0; n < A; n++) {
            for (y = m = _ = S = l = d = c = p = 0, u = O * (b = k[s]), f = O * (x = k[s + 1]), g = O * (w = k[s + 2]), v = O * (C = k[s + 3]), l += L * b, d += L * x, c += L * w, p += L * C, D = I, r = 0; r < O; r++) D.r = b, D.g = x, D.b = w, D.a = C, D = D.next;
            for (r = 1; r < O; r++) o = s + ((G < r ? G : r) << 2), l += (D.r = b = k[o]) * (P = O - r), d += (D.g = x = k[o + 1]) * P, c += (D.b = w = k[o + 2]) * P, p += (D.a = C = k[o + 3]) * P, y += b, m += x, _ += w, S += C, D = D.next;
            for (F = I, B = E, i = 0; i < T; i++) k[s + 3] = C = p * z >> N, 0 !== C ? (C = 255 / C, k[s] = (l * z >> N) * C, k[s + 1] = (d * z >> N) * C, k[s + 2] = (c * z >> N) * C) : k[s] = k[s + 1] = k[s + 2] = 0, l -= u, d -= f, c -= g, p -= v, u -= F.r, f -= F.g, g -= F.b, v -= F.a, o = h + ((o = i + e + 1) < G ? o : G) << 2, l += y += F.r = k[o], d += m += F.g = k[o + 1], c += _ += F.b = k[o + 2], p += S += F.a = k[o + 3], F = F.next, u += b = B.r, f += x = B.g, g += w = B.b, v += C = B.a, y -= b, m -= x, _ -= w, S -= C, B = B.next, s += 4;
            h += T
          }
          for (i = 0; i < T; i++) {
            for (m = _ = S = y = d = c = p = l = 0, u = O * (b = k[s = i << 2]), f = O * (x = k[s + 1]), g = O * (w = k[s + 2]), v = O * (C = k[s + 3]), l += L * b, d += L * x, c += L * w, p += L * C, D = I, r = 0; r < O; r++) D.r = b, D.g = x, D.b = w, D.a = C, D = D.next;
            for (a = T, r = 1; r <= e; r++) s = a + i << 2, l += (D.r = b = k[s]) * (P = O - r), d += (D.g = x = k[s + 1]) * P, c += (D.b = w = k[s + 2]) * P, p += (D.a = C = k[s + 3]) * P, y += b, m += x, _ += w, S += C, D = D.next, r < R && (a += T);
            for (s = i, F = I, B = E, n = 0; n < A; n++) k[(o = s << 2) + 3] = C = p * z >> N, 0 < C ? (C = 255 / C, k[o] = (l * z >> N) * C, k[o + 1] = (d * z >> N) * C, k[o + 2] = (c * z >> N) * C) : k[o] = k[o + 1] = k[o + 2] = 0, l -= u, d -= f, c -= g, p -= v, u -= F.r, f -= F.g, g -= F.b, v -= F.a, o = i + ((o = n + O) < R ? o : R) * T << 2, l += y += F.r = k[o], d += m += F.g = k[o + 1], c += _ += F.b = k[o + 2], p += S += F.a = k[o + 3], F = F.next, u += b = B.r, f += x = B.g, g += w = B.b, v += C = B.a, y -= b, m -= x, _ -= w, S -= C, B = B.next, s += T
          }
        }(t, e)
      },
      Brighten: function(t) {
        var e, i = 255 * this.brightness(),
          n = t.data,
          r = n.length;
        for (e = 0; e < r; e += 4) n[e] += i, n[e + 1] += i, n[e + 2] += i
      },
      Contrast: function(t) {
        var e, i = Math.pow((this.contrast() + 100) / 100, 2),
          n = t.data,
          r = n.length,
          o = 150,
          a = 150,
          s = 150;
        for (e = 0; e < r; e += 4) o = n[e], a = n[e + 1], s = n[e + 2], o /= 255, o -= .5, o *= i, o += .5, a /= 255, a -= .5, a *= i, a += .5, s /= 255, s -= .5, s *= i, s += .5, o = (o *= 255) < 0 ? 0 : 255 < o ? 255 : o, a = (a *= 255) < 0 ? 0 : 255 < a ? 255 : a, s = (s *= 255) < 0 ? 0 : 255 < s ? 255 : s, n[e] = o, n[e + 1] = a, n[e + 2] = s
      },
      Emboss: function(t) {
        var e = 10 * this.embossStrength(),
          i = 255 * this.embossWhiteLevel(),
          n = this.embossDirection(),
          r = this.embossBlend(),
          o = 0,
          a = 0,
          s = t.data,
          h = t.width,
          l = t.height,
          d = 4 * h,
          c = l;
        switch (n) {
          case "top-left":
            a = o = -1;
            break;
          case "top":
            o = -1, a = 0;
            break;
          case "top-right":
            o = -1, a = 1;
            break;
          case "right":
            o = 0, a = 1;
            break;
          case "bottom-right":
            a = o = 1;
            break;
          case "bottom":
            o = 1, a = 0;
            break;
          case "bottom-left":
            a = -(o = 1);
            break;
          case "left":
            o = 0, a = -1;
            break;
          default:
            L.error("Unknown emboss direction: " + n)
        }
        do {
          var p = (c - 1) * d,
            u = o;
          c + u < 1 && (u = 0), l < c + u && (u = 0);
          var f = (c - 1 + u) * h * 4,
            g = h;
          do {
            var v = p + 4 * (g - 1),
              y = a;
            g + y < 1 && (y = 0), h < g + y && (y = 0);
            var m = f + 4 * (g - 1 + y),
              _ = s[v] - s[m],
              S = s[1 + v] - s[1 + m],
              b = s[2 + v] - s[2 + m],
              x = _,
              w = 0 < x ? x : -x;
            if (w < (0 < S ? S : -S) && (x = S), w < (0 < b ? b : -b) && (x = b), x *= e, r) {
              var C = s[v] + x,
                P = s[1 + v] + x,
                k = s[2 + v] + x;
              s[v] = 255 < C ? 255 : C < 0 ? 0 : C, s[1 + v] = 255 < P ? 255 : P < 0 ? 0 : P, s[2 + v] = 255 < k ? 255 : k < 0 ? 0 : k
            } else {
              var T = i - x;
              T < 0 ? T = 0 : 255 < T && (T = 255), s[v] = s[1 + v] = s[2 + v] = T
            }
          } while (--g)
        } while (--c)
      },
      Enhance: function(t) {
        var e, i, n, r, o = t.data,
          a = o.length,
          s = o[0],
          h = s,
          l = o[1],
          d = l,
          c = o[2],
          p = c,
          u = this.enhance();
        if (0 !== u) {
          for (r = 0; r < a; r += 4)(e = o[r + 0]) < s ? s = e : h < e && (h = e), (i = o[r + 1]) < l ? l = i : d < i && (d = i), (n = o[r + 2]) < c ? c = n : p < n && (p = n);
          var f, g, v, y, m, _, S, b, x;
          for (h === s && (h = 255, s = 0), d === l && (d = 255, l = 0), p === c && (p = 255, c = 0), x = 0 < u ? (g = h + u * (255 - h), v = s - u * (s - 0), m = d + u * (255 - d), _ = l - u * (l - 0), b = p + u * (255 - p), c - u * (c - 0)) : (g = h + u * (h - (f = .5 * (h + s))), v = s + u * (s - f), m = d + u * (d - (y = .5 * (d + l))), _ = l + u * (l - y), b = p + u * (p - (S = .5 * (p + c))), c + u * (c - S)), r = 0; r < a; r += 4) o[r + 0] = an(o[r + 0], s, h, v, g), o[r + 1] = an(o[r + 1], l, d, _, m), o[r + 2] = an(o[r + 2], c, p, x, b)
        }
      },
      Grayscale: function(t) {
        var e, i, n = t.data,
          r = n.length;
        for (e = 0; e < r; e += 4) i = .34 * n[e] + .5 * n[e + 1] + .16 * n[e + 2], n[e] = i, n[e + 1] = i, n[e + 2] = i
      },
      HSL: function(t) {
        var e, i, n, r, o, a = t.data,
          s = a.length,
          h = Math.pow(2, this.saturation()),
          l = Math.abs(this.hue() + 360) % 360,
          d = 127 * this.luminance(),
          c = 1 * h * Math.cos(l * Math.PI / 180),
          p = 1 * h * Math.sin(l * Math.PI / 180),
          u = .299 + .701 * c + .167 * p,
          f = .587 - .587 * c + .33 * p,
          g = .114 - .114 * c - .497 * p,
          v = .299 - .299 * c - .328 * p,
          y = .587 + .413 * c + .035 * p,
          m = .114 - .114 * c + .293 * p,
          _ = .299 - .3 * c + 1.25 * p,
          S = .587 - .586 * c - 1.05 * p,
          b = .114 + .886 * c - .2 * p;
        for (e = 0; e < s; e += 4) i = a[e + 0], n = a[e + 1], r = a[e + 2], o = a[e + 3], a[e + 0] = u * i + f * n + g * r + d, a[e + 1] = v * i + y * n + m * r + d, a[e + 2] = _ * i + S * n + b * r + d, a[e + 3] = o
      },
      HSV: function(t) {
        var e, i, n, r, o, a = t.data,
          s = a.length,
          h = Math.pow(2, this.value()),
          l = Math.pow(2, this.saturation()),
          d = Math.abs(this.hue() + 360) % 360,
          c = h * l * Math.cos(d * Math.PI / 180),
          p = h * l * Math.sin(d * Math.PI / 180),
          u = .299 * h + .701 * c + .167 * p,
          f = .587 * h - .587 * c + .33 * p,
          g = .114 * h - .114 * c - .497 * p,
          v = .299 * h - .299 * c - .328 * p,
          y = .587 * h + .413 * c + .035 * p,
          m = .114 * h - .114 * c + .293 * p,
          _ = .299 * h - .3 * c + 1.25 * p,
          S = .587 * h - .586 * c - 1.05 * p,
          b = .114 * h + .886 * c - .2 * p;
        for (e = 0; e < s; e += 4) i = a[e + 0], n = a[e + 1], r = a[e + 2], o = a[e + 3], a[e + 0] = u * i + f * n + g * r, a[e + 1] = v * i + y * n + m * r, a[e + 2] = _ * i + S * n + b * r, a[e + 3] = o
      },
      Invert: function(t) {
        var e, i = t.data,
          n = i.length;
        for (e = 0; e < n; e += 4) i[e] = 255 - i[e], i[e + 1] = 255 - i[e + 1], i[e + 2] = 255 - i[e + 2]
      },
      Kaleidoscope: function(t) {
        var e, i, n, r, o, a, s, h, l, d = t.width,
          c = t.height,
          p = Math.round(this.kaleidoscopePower()),
          u = Math.round(this.kaleidoscopeAngle()),
          f = Math.floor(d * (u % 360) / 360);
        if (!(p < 1)) {
          var g = L.createCanvasElement();
          g.width = d, g.height = c;
          var v = g.getContext("2d").getImageData(0, 0, d, c);
          ! function(t, e, i) {
            var n, r, o, a, s = t.data,
              h = e.data,
              l = t.width,
              d = t.height,
              c = i.polarCenterX || l / 2,
              p = i.polarCenterY || d / 2,
              u = 0,
              f = 0,
              g = 0,
              v = 0,
              y = Math.sqrt(c * c + p * p);
            r = l - c, o = d - p, y = y < (a = Math.sqrt(r * r + o * o)) ? a : y;
            var m, _, S, b, x = d,
              w = l,
              C = 360 / w * Math.PI / 180;
            for (_ = 0; _ < w; _ += 1)
              for (S = Math.sin(_ * C), b = Math.cos(_ * C), m = 0; m < x; m += 1) r = Math.floor(c + y * m / x * b), u = s[(n = 4 * ((o = Math.floor(p + y * m / x * S)) * l + r)) + 0], f = s[n + 1], g = s[n + 2], v = s[n + 3], h[(n = 4 * (_ + m * l)) + 0] = u, h[n + 1] = f, h[n + 2] = g, h[n + 3] = v
          }(t, v, {
            polarCenterX: d / 2,
            polarCenterY: c / 2
          });
          for (var y = d / Math.pow(2, p); y <= 8;) y *= 2, p -= 1;
          var m = y = Math.ceil(y),
            _ = 0,
            S = m,
            b = 1;
          for (d < f + y && (_ = m, S = 0, b = -1), i = 0; i < c; i += 1)
            for (e = _; e !== S; e += b) h = 4 * (d * i + Math.round(e + f) % d), r = v.data[h + 0], o = v.data[h + 1], a = v.data[h + 2], s = v.data[h + 3], l = 4 * (d * i + e), v.data[l + 0] = r, v.data[l + 1] = o, v.data[l + 2] = a, v.data[l + 3] = s;
          for (i = 0; i < c; i += 1)
            for (m = Math.floor(y), n = 0; n < p; n += 1) {
              for (e = 0; e < m + 1; e += 1) h = 4 * (d * i + e), r = v.data[h + 0], o = v.data[h + 1], a = v.data[h + 2], s = v.data[h + 3], l = 4 * (d * i + 2 * m - e - 1), v.data[l + 0] = r, v.data[l + 1] = o, v.data[l + 2] = a, v.data[l + 3] = s;
              m *= 2
            }! function(t, e, i) {
              var n, r, o, a, s, h, l = t.data,
                d = e.data,
                c = t.width,
                p = t.height,
                u = i.polarCenterX || c / 2,
                f = i.polarCenterY || p / 2,
                g = 0,
                v = 0,
                y = 0,
                m = 0,
                _ = Math.sqrt(u * u + f * f);
              r = c - u, o = p - f, _ = _ < (h = Math.sqrt(r * r + o * o)) ? h : _;
              var S, b, x, w = p,
                C = c,
                P = i.polarRotation || 0;
              for (r = 0; r < c; r += 1)
                for (o = 0; o < p; o += 1) a = r - u, s = o - f, S = Math.sqrt(a * a + s * s) * w / _, b = (b = (180 * Math.atan2(s, a) / Math.PI + 360 + P) % 360) * C / 360, x = Math.floor(b), g = l[(n = 4 * (Math.floor(S) * c + x)) + 0], v = l[n + 1], y = l[n + 2], m = l[n + 3], d[(n = 4 * (o * c + r)) + 0] = g, d[n + 1] = v, d[n + 2] = y, d[n + 3] = m
            }(v, t, {
              polarRotation: 0
            })
        }
      },
      Mask: function(t) {
        var e = ln(t, this.threshold());
        return e && function(t, e) {
          for (var i = 0; i < t.width * t.height; i++) t.data[4 * i + 3] = e[i]
        }(t, e = function(t, e, i) {
          for (var n = [1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9], r = Math.round(Math.sqrt(n.length)), o = Math.floor(r / 2), a = [], s = 0; s < i; s++)
            for (var h = 0; h < e; h++) {
              for (var l = s * e + h, d = 0, c = 0; c < r; c++)
                for (var p = 0; p < r; p++) {
                  var u = s + c - o,
                    f = h + p - o;
                  if (0 <= u && u < i && 0 <= f && f < e) {
                    var g = n[c * r + p];
                    d += t[u * e + f] * g
                  }
                }
              a[l] = d
            }
          return a
        }(e = function(t, e, i) {
          for (var n = [1, 1, 1, 1, 1, 1, 1, 1, 1], r = Math.round(Math.sqrt(n.length)), o = Math.floor(r / 2), a = [], s = 0; s < i; s++)
            for (var h = 0; h < e; h++) {
              for (var l = s * e + h, d = 0, c = 0; c < r; c++)
                for (var p = 0; p < r; p++) {
                  var u = s + c - o,
                    f = h + p - o;
                  if (0 <= u && u < i && 0 <= f && f < e) {
                    var g = n[c * r + p];
                    d += t[u * e + f] * g
                  }
                }
              a[l] = 1020 <= d ? 255 : 0
            }
          return a
        }(e = function(t, e, i) {
          for (var n = [1, 1, 1, 1, 0, 1, 1, 1, 1], r = Math.round(Math.sqrt(n.length)), o = Math.floor(r / 2), a = [], s = 0; s < i; s++)
            for (var h = 0; h < e; h++) {
              for (var l = s * e + h, d = 0, c = 0; c < r; c++)
                for (var p = 0; p < r; p++) {
                  var u = s + c - o,
                    f = h + p - o;
                  if (0 <= u && u < i && 0 <= f && f < e) {
                    var g = n[c * r + p];
                    d += t[u * e + f] * g
                  }
                }
              a[l] = 2040 === d ? 255 : 0
            }
          return a
        }(e, t.width, t.height), t.width, t.height), t.width, t.height)), t
      },
      Noise: function(t) {
        var e, i = 255 * this.noise(),
          n = t.data,
          r = n.length,
          o = i / 2;
        for (e = 0; e < r; e += 4) n[e + 0] += o - 2 * o * Math.random(), n[e + 1] += o - 2 * o * Math.random(), n[e + 2] += o - 2 * o * Math.random()
      },
      Pixelate: function(t) {
        var e, i, n, r, o, a, s, h, l, d, c, p, u, f, g = Math.ceil(this.pixelSize()),
          v = t.width,
          y = t.height,
          m = Math.ceil(v / g),
          _ = Math.ceil(y / g),
          S = t.data;
        if (g <= 0) L.error("pixelSize value can not be <= 0");
        else
          for (p = 0; p < m; p += 1)
            for (u = 0; u < _; u += 1) {
              for (l = (h = p * g) + g, c = (d = u * g) + g, f = s = a = o = r = 0, e = h; e < l; e += 1)
                if (!(v <= e))
                  for (i = d; i < c; i += 1) y <= i || (r += S[(n = 4 * (v * i + e)) + 0], o += S[n + 1], a += S[n + 2], s += S[n + 3], f += 1);
              for (r /= f, o /= f, a /= f, s /= f, e = h; e < l; e += 1)
                if (!(v <= e))
                  for (i = d; i < c; i += 1) y <= i || (S[(n = 4 * (v * i + e)) + 0] = r, S[n + 1] = o, S[n + 2] = a, S[n + 3] = s)
            }
      },
      Posterize: function(t) {
        var e, i = Math.round(254 * this.levels()) + 1,
          n = t.data,
          r = n.length,
          o = 255 / i;
        for (e = 0; e < r; e += 1) n[e] = Math.floor(n[e] / o) * o
      },
      RGB: function(t) {
        var e, i, n = t.data,
          r = n.length,
          o = this.red(),
          a = this.green(),
          s = this.blue();
        for (e = 0; e < r; e += 4) i = (.34 * n[e] + .5 * n[e + 1] + .16 * n[e + 2]) / 255, n[e] = i * o, n[e + 1] = i * a, n[e + 2] = i * s, n[e + 3] = n[e + 3]
      },
      RGBA: function(t) {
        var e, i, n = t.data,
          r = n.length,
          o = this.red(),
          a = this.green(),
          s = this.blue(),
          h = this.alpha();
        for (e = 0; e < r; e += 4) i = 1 - h, n[e] = o * h + n[e] * i, n[e + 1] = a * h + n[e + 1] * i, n[e + 2] = s * h + n[e + 2] * i
      },
      Sepia: function(t) {
        var e, i, n, r, o = t.data,
          a = o.length;
        for (e = 0; e < a; e += 4) i = o[e + 0], n = o[e + 1], r = o[e + 2], o[e + 0] = Math.min(255, .393 * i + .769 * n + .189 * r), o[e + 1] = Math.min(255, .349 * i + .686 * n + .168 * r), o[e + 2] = Math.min(255, .272 * i + .534 * n + .131 * r)
      },
      Solarize: function(t) {
        var e = t.data,
          i = t.width,
          n = 4 * i,
          r = t.height;
        do {
          var o = (r - 1) * n,
            a = i;
          do {
            var s = o + 4 * (a - 1),
              h = e[s],
              l = e[1 + s],
              d = e[2 + s];
            127 < h && (h = 255 - h), 127 < l && (l = 255 - l), 127 < d && (d = 255 - d), e[s] = h, e[1 + s] = l, e[2 + s] = d
          } while (--a)
        } while (--r)
      },
      Threshold: function(t) {
        var e, i = 255 * this.threshold(),
          n = t.data,
          r = n.length;
        for (e = 0; e < r; e += 1) n[e] = n[e] < i ? 0 : 255
      }
    }
  })
});
