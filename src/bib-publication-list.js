var bibtexify = (function($) {
    var htmlify = function(str) {
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
            .replace(/\\&/g, '&amp;')
            .replace(/--/g, '&ndash;');
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
            return this.authors2html(entryData.author) + " (" + entryData.year + "): " + 
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
            'article': 'Journal articles',
            'book': 'Books',
            'conference': '',
            'inbook': 'Book chapters',
            'incollection': '',
            'inproceedings': 'Conference articles',
            'manual': 'Manuals',
            'mastersthesis': 'Thesis',
            'misc': 'Misc',
            'phdthesis': 'PhD Thesis',
            'proceedings': 'Conference proceedings',
            'techreport': 'Technical reports',
            'unpublished': 'Unpublished papers'}
    };
    bib2html.phdthesis = bib2html.mastersthesis;
    var stats = { };
    var years = {}, types = {};
    function createFilters() {
        var parentElem = $("#yearFilters").html('').change(function(event) {
            event.stopPropagation();
            $("." + $(event.target).attr('id'), $pubTable).toggleClass('yearhidden');
        });
        var elemCreator = function(elemId) {
            return $("<input/>").
            attr({'type': 'checkbox', 
                'checked': 'true',
                'id': elemId });
        };
        var labelCreator = function(elemId, label) {
            return $("<label/>").attr({'for': elemId}).html(label);
        };
        //console.log(years.length);
        $.each(years, function(key, value) {
            parentElem.append(elemCreator('year' + key)).
            append(labelCreator('year' + key, key));
        });
        parentElem = $("#typeFilters").html('').change(function(event) {
            event.stopPropagation();
            $("." + $(event.target).attr('id'), $pubTable).toggleClass('typehidden');
        });
        $.each(types, function(key, value) {
            parentElem.append(elemCreator('type' + key)).
            append(labelCreator('type' + key, 
                    bib2html.labels[key].split(' ')[0]));
        });
    }
    function entry2html(entryData) {
        var itemStr = htmlify(bib2html[entryData.entryType.toLowerCase()](entryData));
        if (entryData.url && entryData.url.match(/.*\.pdf/)) {
            itemStr += ' (<a title="PDF-version of this article" href="' + entryData.url +
                '">pdf<\/a>)';
        } else if (entryData.url) {
            itemStr += ' (<a title="This article online" href="' + entryData.url +
            '">link<\/a>)';
        } 
        itemStr += '<\/li>';
        return itemStr.replace(/undefined/g, '<span class="undefined">undefined<\/span>');
    }

    function entries2table(bibentries) {
        var htmlStr = '<thead><tr><th>Title</th><th>Year</th><th>Type</th></thead><tbody>';
        bibentries.sort(function(a, b) { return b.year - a.year; });
        var prevYear = null, item, count = 0, header;
        $.each(bibentries, function(index, item) {
            types[item.type] = item.type;
            header = item.year;
            if (index == 0 || (prevYear && header != prevYear)) {
                years[item.year] = true;
                htmlStr += '<tr class="yearHeader year' + header + '"><td>'
                        + header + '<\/td><td class="hiddenCol">' + header
                        + '<\/td><td class="hiddenCol">'
                        + bib2html.importance.TITLE + '<\/td><\/tr>';
            }
            prevYear = header;
            htmlStr += '<tr class="bibitem type' + item.type + ' year'
                    + item.year + ((count % 2 === 0) ? '' : ' odd') + '"><td>'
                    + item.html + '<\/td><td class="hiddenCol">' + item.year
                    + '<\/td><td class="hiddenCol">'
                    + bib2html.importance[item.type] + '<\/td><\/tr>';
            count++;
        });
        $.each(types, function(key, value) {
            htmlStr += '<tr class="typeHeader hiddenheader type' + key + '"><td>' + bib2html.labels[key] + 
                '<\/td><td class="hiddenCol">2100<\/td><td class="hiddenCol">' + 
                bib2html.importance[key] + '<\/td><\/tr>';
        });
        htmlStr += "<\/tbody>";
        createFilters();
        return htmlStr;
    }
    function addProtovis() {
        var yearstats = [], max = 0;
        $.each(stats, function(key, value) {
            max = Math.max(max, value.count);
            yearstats.push({'year': key, 'count': value.count, 
                'item': value, 'types': value.types});
        });
        yearstats.sort(function(a, b) {
            return a.year - b.year; 
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
    function bibdownloaded(data) {
        bibtex = new BibTex();
        bibtex.content = data;
        bibtex.parse();
        var bibentries = [], len = bibtex.data.length;
        for (var index = 0; index < len; index++) {
            var item = bibtex.data[index];
            bibentries.push({
                'year': item.year,
                'type': item.entryType,
                'html': entry2html(item)
            });
            updateStats(item);
        }
        $pubTable.append(entries2table(bibentries)).tablesorter();
        if (options.protovis) {
            addProtovis();
        }

    }
    return function(bibfile, bibElemId, opt) {
        options = $.extend({}, {'protovis': true}, opt);
        var yearBit = 1, typeBit = 0;
        $pubTable = $("#" + bibElemId);
        $pubTable.before((options.protovis?'<div style="float:left;" id="pubchart"></div>':'') + 
                '<div id="pubyeardetails"></div>' +
                '<div class="clear"></div>' +
                '<div><strong>Sort by</strong>' + 
                '<input type="radio" checked="true" name="sort" id="sortByYear"><label for="sortByYear">year</label>' +
                '<input type="radio" name="sort" id="sortByType"><label for="sortByType">type</label>' +
                '</div><div><strong>Show years</strong> <span id="yearFilters"></span>' + 
        '<strong>&nbsp;&nbsp;Show types</strong> <span id="typeFilters"></span></div>');
        $.get(bibfile, bibdownloaded, "text");
        $("#sortByType").click(function(event) {
            typeBit = typeBit?0:1;
            var sorting = [[2,typeBit], [1,1]];
            $(".typeHeader", $pubTable).removeClass("hiddenheader");
            $(".yearHeader", $pubTable).addClass("hiddenheader");
            $pubTable.trigger("sorton",[sorting]);
            yearBit = 0;
        });
        $("#sortByYear").click(function(event) {
            yearBit = yearBit?0:1;
            var sorting = [[1,yearBit], [2,1]]; 
            $(".typeHeader", $pubTable).addClass("hiddenheader");
            $(".yearHeader", $pubTable).removeClass("hiddenheader");
            typeBit = 0;
            $pubTable.trigger("sorton",[sorting]); 
        });
    };
})(jQuery);