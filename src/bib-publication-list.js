
var bibtexify = (function($) {
    var htmlify = function(str) {
        // TODO: this is probably not a complete list..
        str = str.replace(/\\"\{a\}/g, '&auml;')
            .replace(/\{\\aa\}/g, '&aring;')
            .replace(/\\aa\{\}/g, '&aring;')
            .replace(/\\"a/g, '&auml;')
            .replace(/\\"\{o\}/g, '&ouml;')
            .replace(/\\'e/g, '&eacute;')
            .replace(/\\'\{e\}/g, '&eacute;')
            .replace(/\\'a/g, '&aacute;')
            .replace(/\\'A/g, '&Aacute;')
            .replace(/\\"o/g, '&ouml;')
            .replace(/\\ss\{\}/g, '&szlig;')
            .replace(/\{/g, '')
            .replace(/\}/g, '')
            .replace(/\\&/g, '&')
            .replace(/--/g, '&ndash;');
        return str;
    };
    var uriencode = function(str) {
        // TODO: this is probably not a complete list..
        str = str.replace(/\\"\{a\}/g, '%C3%A4')
            .replace(/\{\\aa\}/g, '%C3%A5')
            .replace(/\\aa\{\}/g, '%C3%A5')
            .replace(/\\"a/g, '%C3%A4')
            .replace(/\\"\{o\}/g, '%C3%B6')
            .replace(/\\'e/g, '%C3%A9')
            .replace(/\\'\{e\}/g, '%C3%A9')
            .replace(/\\'a/g, '%C3%A1')
            .replace(/\\'A/g, '%C3%81')
            .replace(/\\"o/g, '%C3%B6')
            .replace(/\\ss\{\}/g, '%C3%9F')
            .replace(/\{/g, '')
            .replace(/\}/g, '')
            .replace(/\\&/g, '%26')
            .replace(/--/g, '%E2%80%93');
        return str;
    };

    var options;
    var $pubTable;

    var bib2html = {
        authors2html: function(authorData) {
            var authorsStr = '';
            for (var index = 0; index < authorData.length; index++) {
                if (index > 0) { authorsStr += ", "; }
                authorsStr += authorData[index].last;
            }
            return htmlify(authorsStr);
        },
        links: function(entryData) {
            var itemStr = '';
            if (entryData.url && entryData.url.match(/.*\.pdf/)) {
                itemStr += ' (<a title="PDF-version of this article" href="' + entryData.url +
                    '">pdf<\/a>)';
            } else if (entryData.url) {
                itemStr += ' (<a title="This article online" href="' + entryData.url +
                '">link<\/a>)';
            } 
            return itemStr;
        },
        bibtex: function(entryData) {
            var itemStr = '';
            itemStr += ' (<a title="This article as BibTeX" href="#" class="biblink">bib</a>)<div class="bibinfo hidden">';
            itemStr += '<a href="#" class="bibclose" title="Close">x</a><pre>';
            itemStr += '@' + entryData.entryType + "{" + entryData.cite + ",\n";
            $.each(entryData, function(key, value) {
                if (key == 'author') {
                    itemStr += '  author = { '
                    for (var index = 0; index < value.length; index++) {
                        if (index > 0) { itemStr += " and "; }
                        itemStr += value[index].last;
                    }
                    itemStr += ' },\n';
                } else if (key != 'entryType' && key != 'cite') {
                    itemStr += '  ' + key + " = { " + value + " },\n";
                }
            });
            itemStr += "}</pre></div>";
            return itemStr;
        },
        tweet: function(entryData) {
          // <a href="http://twitter.com/share?url=http%3A%2F%2Fdev.twitter.com%2Fpages%2Ftweet-button" target="_blank">Tweet</a>
          // url, via, text
          var itemStr = ' (<a title="Tweet this article" href="http://twitter.com/share?url=';
          itemStr += entryData.url;
          itemStr += '&via=' + options.tweet;
          itemStr += '&text=';
          var splitName = function(wholeName) {
            var spl = wholeName.split(' ');
            return spl[spl.length-1];
          }
          var auth = entryData.author;
          if (auth.length == 1) {
            itemStr += uriencode(splitName(auth[0].last));
          } else if (auth.length == 2) {
            itemStr += uriencode(splitName(auth[0].last) + "%26" + splitName(auth[1].last));
          } else {
            itemStr += uriencode(splitName(auth[0].last) + " et al");
          }
          itemStr += ": " + encodeURIComponent('"' + entryData.title + '"');
          itemStr += '" target="_blank">tweet</a>)';
          return itemStr;
        },
        inproceedings: function(entryData) {
            return this.authors2html(entryData.author) + " (" + entryData.year + "). " + 
                entryData.title + ". In <em>" + entryData.booktitle + 
                ", pp. " + entryData.pages + 
                ((entryData.address)?", " + entryData.address:"") + ".<\/em>";
        },
        article: function(entryData) {
            return this.authors2html(entryData.author) + " (" + entryData.year + "). " + 
                entryData.title + ". <em>" + entryData.journal + ", " + entryData.volume +
                ((entryData.number)?"(" + entryData.number + ")":"")+ ", " + 
                entryData.pages + ". " + 
                ((entryData.address)?entryData.address + ".":"") + "<\/em>";
        },
        misc: function(entryData) {
            return this.authors2html(entryData.author) + " (" + entryData.year + "). " + 
                entryData.title + ". " + 
                ((entryData.howpublished)?entryData.howpublished + ". ":"") + 
                ((entryData.note)?entryData.note + ".":"");
        },
        mastersthesis: function(entryData) {
            return this.authors2html(entryData.author) + " (" + entryData.year + "). " + 
            entryData.title + ". " + entryData.type + ". " +
            entryData.organization + ", " + entryData.school + ".";
        },
        techreport: function(entryData) {
            return this.authors2html(entryData.author) + " (" + entryData.year + "). " + 
                entryData.title + ". " + entryData.institution + ". " +
                entryData.number + ". " + entryData.type + ".";
        },
        importance: {
            'TITLE': 9999,
            'misc': 0,
            'manual': 10,
            'techreport': 20,
            'mastersthesis': 30,
            'inproceedings': 40,
            'incollection': 50,
            'proceedings': 60,
            'conference': 70,
            'article': 80,
            'phdthesis': 90,
            'inbook': 100,
            'book': 110,
            'unpublished': 120
        },
        labels: {
            'article': 'Journal',
            'book': 'Book',
            'conference': '',
            'inbook': 'Book chapter',
            'incollection': '',
            'inproceedings': 'Conference',
            'manual': 'Manual',
            'mastersthesis': 'Thesis',
            'misc': 'Misc',
            'phdthesis': 'PhD Thesis',
            'proceedings': 'Conference proceeding',
            'techreport': 'Technical report',
            'unpublished': 'Unpublished'}
    };
    bib2html.phdthesis = bib2html.mastersthesis;
    var stats = { };
    var years = {}, types = {};
    function entry2html(entryData) {
        var itemStr = htmlify(bib2html[entryData.entryType.toLowerCase()](entryData));
        itemStr += bib2html.links(entryData);
        itemStr += bib2html.bibtex(entryData);
        if (options.tweet && entryData.url) {
          itemStr += bib2html.tweet(entryData);
        }
        return itemStr.replace(/undefined/g, '<span class="undefined">undefined<\/span>');
    }

    function addProtovis() {
        var yearstats = [], max = 0;
        $.each(stats, function(key, value) {
            max = Math.max(max, value.count);
            yearstats.push({'year': key, 'count': value.count, 
                'item': value, 'types': value.types});
        });
        yearstats.sort(function(a, b) {
            var diff = a.year - b.year;
            if (!isNaN(diff)) {
              return diff;
            } else if (a.year < b.year) {
              return -1;
            } else if (a.year > b.year) {
              return 1;
            }
            return 0; 
        });
        var stats2html = function(item) {
            var str = '<h3>' + item.year + ' (total ' + item.count + ')<\/h3>';
            str += '<ul>';
            $.each(item.types, function(type, value) {
                str += '<li>' + bib2html.labels[type] + ' ' + value + '<\/li>';
            });
            return str + '<\/ul>';
        };
        var w = 500, h = 100,
            x = pv.Scale.ordinal(pv.range(yearstats.length)).splitBanded(0, w, 4.8/5),
            y = pv.Scale.linear(0, max).range(0, h),
            vis = new pv.Panel().width(w).height(h).bottom(20).
                left(20).right(5).top(5);

        vis.canvas("pubchart");
        var bar = vis.add(pv.Bar).data(yearstats).
            left(function() { return x(this.index); } ).
            width(x.range().band).bottom(0).fillStyle("#eee").
            event("mouseover", function(d) { $("#pubyeardetails").html(stats2html(d)).show();}).
            height(function(d) { return d.count*h/max; });

        bar.anchor("bottom").add(pv.Label).textStyle("black").
            text(function(d) { return d.count.toFixed(0);});

        bar.anchor("bottom").add(pv.Label).textMargin(5).
            textBaseline("top").text(function(d) { return d.year;});

        vis.add(pv.Rule).data(y.ticks()).
            bottom(function(d) {return Math.round(y(d)) - 0.5;}).
            strokeStyle(function(d) {return d ? "rgba(255,255,255,.4)" : "#000";});

        vis.render();				
    }
    function updateStats(item) {
        if (!stats[item.year]) {
            stats[item.year] = { 'count': 1, 'types': {} };
            stats[item.year].types[item.entryType] = 1;
        } else {
            stats[item.year].count += 1;
            if (stats[item.year].types[item.entryType]) {
                stats[item.year].types[item.entryType] += 1;
            } else {
                stats[item.year].types[item.entryType] = 1;
            }
        }
    }
    function showbib(event) {
        $(this).next(".bibinfo").removeClass('hidden').addClass("open");
        $("#shutter").show();
        event.preventDefault();
    }
    function hidebib(event) {
        $("#shutter").hide();
        $(".bibinfo.open").removeClass("open").addClass("hidden");
        event.preventDefault();
    }
    function bibdownloaded(data) {
        var bibtex = new BibTex();
        bibtex.content = data;
        bibtex.parse();
        var bibentries = [], len = bibtex.data.length;
		var entryTypes = {};
		jQuery.extend(true, bib2html, options.bib2html);
        for (var index = 0; index < len; index++) {
            var item = bibtex.data[index];
            bibentries.push([item.year, bib2html.labels[item.entryType], entry2html(item)]);
			      entryTypes[bib2html.labels[item.entryType]] = item.entryType;
            updateStats(item);
        }
        jQuery.fn.dataTableExt.oSort['type-sort-asc'] = function(x, y) {
            var item1 = bib2html.importance[entryTypes[x]], 
                item2 = bib2html.importance[entryTypes[y]];
            return ((item1 < item2) ? -1 : ((item1 > item2) ?  1 : 0));
        };
        jQuery.fn.dataTableExt.oSort['type-sort-desc'] = function(x, y) {
            var item1 = bib2html.importance[entryTypes[x]], 
                item2 = bib2html.importance[entryTypes[y]];
            return ((item1 < item2) ? 1 : ((item1 > item2) ?  -1 : 0));
        };
        var table = $pubTable.dataTable({ 'aaData': bibentries, 
                              'aaSorting': options.sorting, 
                              'aoColumns': [ { "sTitle": "Year" },
                                             { "sTitle": "Type", "sType": "type-sort", "asSorting": [ "desc", "asc" ] },
                                             { "sTitle": "Publication", "bSortable": false }],
                              'bPaginate': false
                            });
        // visualization does not work in IE, so leave it out
        if (options.protovis && !$.browser.msie) {
            addProtovis();
        }
        $("th", $pubTable).unbind("click").click(function(e) {
          var $this = $(this),
              $thElems = $this.parent().find("th"),
              index = $thElems.index($this);
          if ($this.hasClass("sorting_disabled")) { return; }
          $this.toggleClass("sorting_asc").toggleClass("sorting_desc");

          if (index === 0) {
            table.fnSort( [[0, $thElems.eq(0).hasClass("sorting_asc")?"asc":"desc"],
                        [1, $thElems.eq(1).hasClass("sorting_asc")?"asc":"desc"]]);
          } else {
            table.fnSort( [[1, $thElems.eq(1).hasClass("sorting_asc")?"asc":"desc"],
                          [0, $thElems.eq(0).hasClass("sorting_asc")?"asc":"desc"]]);
          }
        });
        $("#shutter").click(hidebib);
        $(".biblink").live('click', showbib);
        $(".bibclose").live('click', hidebib);
    }
    return function(bibsrc, bibElemId, opt) {
        options = $.extend({}, {'protovis': true, 'sorting': [[0, "desc"], [1, "desc"]]}, opt);
        var yearBit = 1, typeBit = 0;
        $pubTable = $("#" + bibElemId);
        $pubTable.before('<div id="shutter" class="hidden"></div>');
        if (options.protovis) {
            $pubTable.before('<div id="pubchart"></div>' + 
                '<div id="pubyeardetails"></div>' +
                '<div class="clear"></div>');
        }
        var $bibSrc = $(bibsrc);
        if ($bibSrc.length) {
            bibdownloaded($bibSrc.html());
            $bibSrc.hide();
        } else {
            $.get(bibsrc, bibdownloaded, "text");
        }
    };
})(jQuery);