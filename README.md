**bib-publication-list to automatically generate an interactive HTML publication list from a BibTeX file**

## Getting Started

First, load the required JavaScript files:

    <script src="jquery.min.js"></script>
    <script src="bib-list-min.js"></script>

Include the CSS:

    <link rel="stylesheet" href="bib-publication-list.css" type="text/css" />

All you need to do is to include the BibTeX into an HTML page and tell the script to turn it 
into a sortable and searchable table. For example:

    <table id="pubTable" class="display"></table>
    <pre id="bibtex">@article{Karavirta:JVLCTaxonomy,
       title = {A comprehensive taxonomy of algorithm animation languages},
       journal = {Journal of Visual Languages \& Computing},
       volume = {20},
       number = {1},
       pages = {1--22},
       year = {2010},
       issn = {1045-926X},
       doi = {DOI: 10.1016/j.jvlc.2009.09.001},
       author = {Ville Karavirta and Ari Korhonen and Lauri Malmi and Thomas Naps}
    }
    </pre>

Finally, the bib-publication-list needs to know the input data element and the output table. So, one 
line of JavaScript:

    bibtexify("#bibtex", "pubTable");

Alternatively, the bibtex can be loaded from a file. Personally I prefer including it in the HTML, 
though. This way, browsers without JavaScript enabled get at least to see the bibtex instead of a blank page.
This causes an ugly-looking flash of unstyled content, though.

    bibtexify("example-biblist.bib", "pubTable");

The result looks like my publication list at: http://villekaravirta.com/publications/.

If you want to fix the flash of unstyled content, you can hide the #bibtex element and make it
visible when JavaScript is disabled. To do that, add

    #bibtex { display: none; }

to your CSS and

    <noscript><style>#bibtex { display: block; }</style></noscript>

to your HTML.


## Configuration Options

The bibtexify function accepts an optional third parameter for configuration options. These options include:

<table>
<tbody>
<tr><td>visualization</td><td>A boolean to control addition of the visualization. Defaults to true.</td></tr>
<tr><td>tweet</td><td>Twitter username to add Tweet links to bib items with a url field.</td></tr>
<tr><td>sorting</td><td>Control the default sorting of the list. Defaults to `[[0, "desc"], [1, "desc"]]`. See (http://datatables.net/api#fnSort) for details on formatting.</td></tr>
<tr><td>defaultYear</td><td>Entries without a year will use this as year. Defaults to "To Appear".
</tbody>
</table>

## Building from source

There is a Jakefile for building the combined and minified versions with [Jake](https://github.com/mde/jake)
and a Makefile for building with make.


## Credits

This code uses some great libraries: [jQuery](http://jquery.com/), [DataTables](http://datatables.net/),
and [JavaScript BibTeX Parser](http://sourceforge.net/projects/jsbibtex/).
