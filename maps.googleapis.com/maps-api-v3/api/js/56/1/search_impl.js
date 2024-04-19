google.maps.__gjsload__('search_impl', function(_) {
    var ljb = function(a, b) {
            _.H(a.Ig, 3, b)
        },
        pjb = function(a, b, c) {
            const d = _.sL(new mjb);
            c.sq = (0, _.wa)(d.load, d);
            c.clickable = 0 != a.get("clickable");
            _.QLa(c, _.ER(b));
            const e = [];
            e.push(_.hk(c, "click", (0, _.wa)(njb, null, a)));
            _.Qb(["mouseover", "mouseout", "mousemove"], function(f) {
                e.push(_.hk(c, f, (0, _.wa)(ojb, null, a, f)))
            });
            e.push(_.hk(a, "clickable_changed", function() {
                a.Fg.clickable = 0 != a.get("clickable")
            }));
            a.Gg = e
        },
        njb = function(a, b, c, d, e) {
            let f = null;
            if (e && (f = {
                    status: e.getStatus()
                }, 0 == e.getStatus())) {
                f.location = _.X(e.Ig,
                    2) ? new _.vj(_.su(_.J(e.Ig, 2, _.yu).Ig, 1), _.su(_.J(e.Ig, 2, _.yu).Ig, 2)) : null;
                f.fields = {};
                const g = _.ii(e.Ig, 3);
                for (let h = 0; h < g; ++h) {
                    const l = _.Ur(e.Ig, 3, _.NR, h);
                    f.fields[l.getKey()] = l.getValue()
                }
            }
            _.uk(a, "click", b, c, d, f)
        },
        ojb = function(a, b, c, d, e, f, g) {
            let h = null;
            f && (h = {
                title: f[1].title,
                snippet: f[1].snippet
            });
            _.uk(a, b, c, d, e, h, g)
        },
        qjb = function() {},
        rjb = class extends _.R {
            constructor() {
                super()
            }
            Zi() {
                return _.Gi(this.Ig, 2)
            }
        },
        sjb = [_.K, , , _.Sp, _.XMa];
    var tjb = class extends _.R {
        constructor(a) {
            super(a)
        }
        getStatus() {
            return _.I(this.Ig, 1, -1)
        }
    };
    var mjb = class {
        constructor() {
            var a = _.Go,
                b = _.Do;
            this.Gg = _.Ii;
            this.Fg = _.Or(_.Ez, a, _.qB + "/maps/api/js/LayersService.GetFeature", b)
        }
        load(a, b) {
            function c(g) {
                g = new tjb(g);
                b(g)
            }
            var d = new rjb;
            _.H(d.Ig, 1, a.layerId.split("|")[0]);
            _.H(d.Ig, 2, a.featureId);
            ljb(d, this.Gg.Fg().Fg());
            for (var e in a.parameters) {
                var f = _.xi(d.Ig, 4, _.NR);
                _.H(f.Ig, 1, e);
                _.H(f.Ig, 2, a.parameters[e])
            }
            a = _.pi(d.zi(), sjb, 1);
            this.Fg(a, c, c);
            return a
        }
        cancel() {
            throw Error("Not implemented");
        }
    };
    qjb.prototype.uD = function(a) {
        if (_.dn[15]) {
            var b = a.Jg;
            const c = a.Jg = a.getMap();
            b && a.Fg && (a.Hg ? (b = b.__gm.Wj, b.set(b.get().qn(a.Fg))) : a.Fg && _.mMa(a.Fg, b) && (_.Qb(a.Gg || [], _.jk), a.Gg = null));
            if (c) {
                b = new _.vy;
                const d = a.get("layerId").split("|");
                b.layerId = d[0];
                for (let e = 1; e < d.length; ++e) {
                    const [f, ...g] = d[e].split(":");
                    b.parameters[f] = g.join(":")
                }
                a.get("spotlightDescription") && (b.spotlightDescription = new _.Uy(a.get("spotlightDescription")));
                a.get("paintExperimentIds") && (b.paintExperimentIds = a.get("paintExperimentIds").slice(0));
                a.get("styler") && (b.styler = new _.Jy(a.get("styler")));
                a.get("roadmapStyler") && (b.roadmapStyler = new _.Jy(a.get("roadmapStyler")));
                a.get("travelMapRequest") && (b.travelMapRequest = new _.Mha(a.get("travelMapRequest")));
                a.get("mapsApiLayer") && (b.mapsApiLayer = new _.By(a.get("mapsApiLayer")));
                a.get("mapFeatures") && (b.mapFeatures = a.get("mapFeatures"));
                a.get("clickableCities") && (b.clickableCities = a.get("clickableCities"));
                a.get("searchPipeMetadata") && (b.searchPipeMetadata = new _.bB(a.get("searchPipeMetadata")));
                a.get("overlayLayer") && (b.overlayLayer = new _.Vy(a.get("overlayLayer")));
                a.get("caseExperimentIds") && (b.caseExperimentIds = a.get("caseExperimentIds").slice(0));
                a.get("boostMapExperimentIds") && (b.boostMapExperimentIds = a.get("boostMapExperimentIds").slice(0));
                a.get("airQualityPipeMetadata") && (b.airQualityPipeMetadata = new _.rha(a.get("airQualityPipeMetadata")));
                a.get("directionsPipeParameters") && (b.directionsPipeParameters = new _.pha(a.get("directionsPipeParameters")));
                a.get("clientSignalPipeMetadata") &&
                    (b.clientSignalPipeMetadata = new _.MA(a.get("clientSignalPipeMetadata")));
                b.darkLaunch = !!a.get("darkLaunch");
                a.Fg = b;
                a.Hg = a.get("renderOnBaseMap");
                a.Hg ? (a = c.__gm.Wj, a.set(a.get().Bl(b))) : pjb(a, c, b);
                _.ol(c, "Lg");
                _.ml(c, 148282)
            }
        }
    };
    _.Zj("search_impl", new qjb);
});