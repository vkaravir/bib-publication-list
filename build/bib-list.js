/*!*
 * Javascript BibTex Parser v0.1
 * Copyright (c) 2008 Simon Fraser University
 * @author Steve Hannah <shannah at sfu dot ca>
 * 
 *
 * License:
 * 
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 * 
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 * 
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 *
 * Credits:
 *
 * This library is a port of the PEAR Structures_BibTex parser written
 * in PHP (http://pear.php.net/package/Structures_BibTex).
 *
 * In order to make porting the parser into javascript easier, I have made
 * use of many phpjs functions, which are distributed here under the MIT License:
 *
 * 
 * More info at: http://kevin.vanzonneveld.net/techblog/category/php2js
 * 
 * php.js is copyright 2008 Kevin van Zonneveld.
 * 
 * Portions copyright Ates Goral (http://magnetiq.com), Legaev Andrey,
 * _argos, Jonas Raoni Soares Silva (http://www.jsfromhell.com),
 * Webtoolkit.info (http://www.webtoolkit.info/), Carlos R. L. Rodrigues, Ash
 * Searle (http://hexmen.com/blog/), Tyler Akins (http://rumkin.com), mdsjack
 * (http://www.mdsjack.bo.it), Alexander Ermolaev
 * (http://snippets.dzone.com/user/AlexanderErmolaev), Andrea Giammarchi
 * (http://webreflection.blogspot.com), Bayron Guevara, Cord, David, Karol
 * Kowalski, Leslie Hoare, Lincoln Ramsay, Mick@el, Nick Callen, Peter-Paul
 * Koch (http://www.quirksmode.org/js/beat.html), Philippe Baumann, Steve
 * Clay, booeyOH
 * 
 * Licensed under the MIT (MIT-LICENSE.txt) license.
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL KEVIN VAN ZONNEVELD BE LIABLE FOR ANY CLAIM, DAMAGES 
 * OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR 
 * OTHER DEALINGS IN THE SOFTWARE.
 *
 *
 * Synopsis:
 * ----------
 *
 * This class provides the following functionality:
 *    1. Parse BibTex into a logical data javascript data structure.
 *    2. Output parsed BibTex entries as HTML, RTF, or BibTex.
 *
 *  
 * The following usage instructions have been copyed and adapted from the PHP instructions located
 * at http://pear.php.net/manual/en/package.structures.structures-bibtex.intro.php
 * Introduction
 * --------------
 * Overview
 * ----------
 * This package provides methods to access information stored in a BibTex
 * file. During parsing it is possible to let the data be validated. In
 * addition. the creation of BibTex Strings as well as RTF Strings is also
 * supported. A few examples
 * 
 * Example 1. Loading a BibTex File and printing the parsed array
 * <script src="BibTex.js"></script>
 * <script>
 * bibtex�=�new�BibTex();
 * bibtex.content = content; // the bibtex content as a string
 * 
 * bibtex->parse();
 * alert(print_r($bibtex->data,true));
 * </script>
 * 
 * 
 * Options
 * --------
 * Options can be set either in the constructor or with the method
 * setOption(). When setting in the constructor the options are given in an
 * associative array. The options are:
 * 
 * 	-	stripDelimiter (default: true) Stripping the delimiter surrounding the entries. 
 * 	-	validate (default: true) Validation while parsing. 
 * 	-	unwrap (default: false) Unwrapping entries while parsing. 
 * 	-	wordWrapWidth (default: false) If set to a number higher one
 * 	    that the entries are wrapped after that amount of characters. 
 * 	-	wordWrapBreak (default: \n) String used to break the line (attached to the line). 
 * 	-	wordWrapCut (default: 0) If set to zero the line will we
 * 	    wrapped at the next possible space, if set to one the line will be
 * 	    wrapped exactly after the given amount of characters. 
 * 	-	removeCurlyBraces (default: false) If set to true Curly Braces will be removed. 
 * 
 * Example of setting options in the constructor:
 * 
 * Example 2. Setting options in the constructor
 * bibtex�=�new�BibTex({'validate':false,�'unwrap':true});
 * 
 * 
 * Example of setting options using the method setOption():
 * 
 * Example 62-3. Setting options using setOption
 * bibtex�=�new�BibTex();
 * bibtex.setOption('validate',�false);
 * bibtex.setOption('unwrap',�true);
 * 
 * Stored Data
 * ------------
 * The data is stored in the class variable data. This is a a list where
 * each entry is a hash table representing one bibtex-entry. The keys of
 * the hash table correspond to the keys used in bibtex and the values are
 * the corresponding values. Some of these keys are:
 * 
 * 	-	cite - The key used in a LaTeX source to do the citing. 
 * 	-	entryType - The type of the entry, like techreport, book and so on. 
 * 	-	author - One or more authors of the entry. This entry is also a
 * 	    list with hash tables representing the authors as entries. The
 * 	    author has table is explained later. 
 * 	-	title - Title of the entry. 
 * 
 * Author
 * ------
 * As described before the authors are stored in a list. Every entry
 * representing one author as a has table. The hash table consits of four
 * keys: first, von, last and jr. The keys are explained in the following
 * list:
 * 
 * 	-	first - The first name of the author. 
 * 	-	von - Some names have a 'von' part in their name. This is usually a sign of nobleness. 
 * 	-	last - The last name of the author. 
 * 	-	jr - Sometimes a author is the son of his father and has the
 * 	    same name, then the value would be jr. The same is true for the
 * 	    value sen but vice versa. 
 * 
 * Adding an entry
 * ----------------
 * To add an entry simply create a hash table with the needed keys and
 * values and call the method addEntry().
 * Example 4. Adding an entry
 * bibtex�������������������������=�new�BibTex();
 * var addarray�����������������������=�{};
 * addarray['entryType']����������=�'Article';
 * addarray['cite']���������������=�'art2';
 * addarray['title']��������������=�'Titel�of�the�Article';
 * addarray['author'] = [];
 * addarray['author'][0]['first']�=�'John';
 * addarray['author'][0]['last']��=�'Doe';
 * addarray['author'][1]['first']�=�'Jane';
 * addarray['author'][1]['last']��=�'Doe';
 * bibtex.addEntry(addarray);
 */

// ------------BEGIN PHP FUNCTIONS -------------------------------------------------------------- //

// {{{ array
function array( ) {
    // #!#!#!#!# array::$descr1 does not contain valid 'array' at line 258
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array/
    // +       version: 805.1716
    // +   original by: d3x
    // *     example 1: array('Kevin', 'van', 'Zonneveld');
    // *     returns 1: ['Kevin', 'van', 'Zonneveld'];

    return Array.prototype.slice.call(arguments);
}// }}}

// {{{ array_key_exists
function array_key_exists ( key, search ) {
    // Checks if the given key or index exists in the array
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_key_exists/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Felix Geisendoerfer (http://www.debuggable.com/felix)
    // *     example 1: array_key_exists('kevin', {'kevin': 'van Zonneveld'});
    // *     returns 1: true

    // input sanitation
    if( !search || (search.constructor !== Array && search.constructor !== Object) ){
        return false;
    }

    return key in search;
}// }}}// {{{ array_keys
function array_keys( input, search_value, strict ) {
    // Return all the keys of an array
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_keys/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: array_keys( {firstname: 'Kevin', surname: 'van Zonneveld'} );
    // *     returns 1: {0: 'firstname', 1: 'surname'}

    var tmp_arr = new Array(), strict = !!strict, include = true, cnt = 0;

    for ( key in input ){
        include = true;
        if ( search_value != undefined ) {
            if( strict && input[key] !== search_value ){
                include = false;
            } else if( input[key] != search_value ){
                include = false;
            }
        }

        if( include ) {
            tmp_arr[cnt] = key;
            cnt++;
        }
    }

    return tmp_arr;
}// }}}

// {{{ in_array
function in_array(needle, haystack, strict) {
    // Checks if a value exists in an array
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_in_array/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: in_array('van', ['Kevin', 'van', 'Zonneveld']);
    // *     returns 1: true

    var found = false, key, strict = !!strict;

    for (key in haystack) {
        if ((strict && haystack[key] === needle) || (!strict && haystack[key] == needle)) {
            found = true;
            break;
        }
    }

    return found;
}// }}}

// {{{ sizeof
function sizeof ( mixed_var, mode ) {
    // Alias of count()
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_sizeof/
    // +       version: 804.1712
    // +   original by: Philip Peterson
    // -    depends on: count
    // *     example 1: sizeof([[0,0],[0,-4]], 'COUNT_RECURSIVE');
    // *     returns 1: 6
    // *     example 2: sizeof({'one' : [1,2,3,4,5]}, 'COUNT_RECURSIVE');
    // *     returns 2: 6
 
    return count( mixed_var, mode );
}// }}}

// {{{ count
function count( mixed_var, mode ) {
    // Count elements in an array, or properties in an object
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_count/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: _argos
    // *     example 1: count([[0,0],[0,-4]], 'COUNT_RECURSIVE');
    // *     returns 1: 6
    // *     example 2: count({'one' : [1,2,3,4,5]}, 'COUNT_RECURSIVE');
    // *     returns 2: 6

    var key, cnt = 0;

    if( mode == 'COUNT_RECURSIVE' ) mode = 1;
    if( mode != 1 ) mode = 0;

    for (key in mixed_var){
        cnt++;
        if( mode==1 && mixed_var[key] && (mixed_var[key].constructor === Array || mixed_var[key].constructor === Object) ){
            cnt += count(mixed_var[key], 1);
        }
    }

    return cnt;
}// }}}

// {{{ explode
function explode( delimiter, string, limit ) {
    // Split a string by string
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_explode/
    // +       version: 805.1715
    // +     original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +     improved by: kenneth
    // +     improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +     improved by: d3x
    // +     bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: explode(' ', 'Kevin van Zonneveld');
    // *     returns 1: {0: 'Kevin', 1: 'van', 2: 'Zonneveld'}
    // *     example 2: explode('=', 'a=bc=d', 2);
    // *     returns 2: ['a', 'bc=d']
 
    var emptyArray = { 0: '' };
    
    // third argument is not required
    if ( arguments.length < 2
        || typeof arguments[0] == 'undefined'
        || typeof arguments[1] == 'undefined' )
    {
        return null;
    }
 
    if ( delimiter === ''
        || delimiter === false
        || delimiter === null )
    {
        return false;
    }
 
    if ( typeof delimiter == 'function'
        || typeof delimiter == 'object'
        || typeof string == 'function'
        || typeof string == 'object' )
    {
        return emptyArray;
    }
 
    if ( delimiter === true ) {
        delimiter = '1';
    }
    
    if (!limit) {
        return string.toString().split(delimiter.toString());
    } else {
        // support for limit argument
        var splitted = string.toString().split(delimiter.toString());
        var partA = splitted.splice(0, limit - 1);
        var partB = splitted.join(delimiter.toString());
        partA.push(partB);
        return partA;
    }
}// }}}

// {{{ implode
function implode( glue, pieces ) {
    // Join array elements with a string
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_implode/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: _argos
    // *     example 1: implode(' ', ['Kevin', 'van', 'Zonneveld']);
    // *     returns 1: 'Kevin van Zonneveld'

    return ( ( pieces instanceof Array ) ? pieces.join ( glue ) : pieces );
}// }}}

// {{{ join
function join( glue, pieces ) {
    // Alias of implode()
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_join/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // -    depends on: implode
    // *     example 1: join(' ', ['Kevin', 'van', 'Zonneveld']);
    // *     returns 1: 'Kevin van Zonneveld'

    return implode( glue, pieces );
}// }}}

// {{{ split
function split( delimiter, string ) {
    // Split string into array by regular expression
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_split/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // -    depends on: explode
    // *     example 1: split(' ', 'Kevin van Zonneveld');
    // *     returns 1: {0: 'Kevin', 1: 'van', 2: 'Zonneveld'}

    return explode( delimiter, string );
}// }}}

// {{{ str_replace
function str_replace(search, replace, subject) {
    // Replace all occurrences of the search string with the replacement string
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_str_replace/
    // +       version: 805.3114
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Gabriel Paderni
    // +   improved by: Philip Peterson
    // +   improved by: Simon Willison (http://simonwillison.net)
    // +    revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // -    depends on: is_array
    // *     example 1: str_replace(' ', '.', 'Kevin van Zonneveld');
    // *     returns 1: 'Kevin.van.Zonneveld'
    // *     example 2: str_replace(['{name}', 'l'], ['hello', 'm'], '{name}, lars');
    // *     returns 2: 'hemmo, mars'    
    
    var f = search, r = replace, s = subject;
    var ra = is_array(r), sa = is_array(s), f = [].concat(f), r = [].concat(r), i = (s = [].concat(s)).length;

    while (j = 0, i--) {
        while (s[i] = s[i].split(f[j]).join(ra ? r[j] || "" : r[0]), ++j in f){};
    };
     
    return sa ? s : s[0];
}// }}}

// {{{ strlen
function strlen( string ){
    // Get string length
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_strlen/
    // +       version: 805.1616
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Sakimori
    // *     example 1: strlen('Kevin van Zonneveld');
    // *     returns 1: 19

    return ("" + string).length;
}// }}}

// {{{ strpos
function strpos( haystack, needle, offset){
    // Find position of first occurrence of a string
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_strpos/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: strpos('Kevin van Zonneveld', 'e', 5);
    // *     returns 1: 14

    var i = haystack.indexOf( needle, offset ); // returns -1
    return i >= 0 ? i : false;
}// }}}

// {{{ strrpos
function strrpos( haystack, needle, offset){
    // Find position of last occurrence of a char in a string
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_strrpos/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: strrpos('Kevin van Zonneveld', 'e');
    // *     returns 1: 16

    var i = haystack.lastIndexOf( needle, offset ); // returns -1
    return i >= 0 ? i : false;
}// }}}

// {{{ strtolower
function strtolower( str ) {
    // Make a string lowercase
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_strtolower/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: strtolower('Kevin van Zonneveld');
    // *     returns 1: 'kevin van zonneveld'

    return str.toLowerCase();
}// }}}

// {{{ strtoupper
function strtoupper( str ) {
    // Make a string uppercase
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_strtoupper/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: strtoupper('Kevin van Zonneveld');
    // *     returns 1: 'KEVIN VAN ZONNEVELD'

    return str.toUpperCase();
}// }}}

// {{{ substr
function substr( f_string, f_start, f_length ) {
    // Return part of a string
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_substr/
    // +       version: 804.1712
    // +     original by: Martijn Wieringa
    // *         example 1: substr('abcdef', 0, -1);
    // *         returns 1: 'abcde'

    if(f_start < 0) {
        f_start += f_string.length;
    }

    if(f_length == undefined) {
        f_length = f_string.length;
    } else if(f_length < 0){
        f_length += f_string.length;
    } else {
        f_length += f_start;
    }

    if(f_length < f_start) {
        f_length = f_start;
    }

    return f_string.substring(f_start, f_length);
}// }}}

// {{{ trim
function trim( str, charlist ) {
    // Strip whitespace (or other characters) from the beginning and end of a string
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_trim/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: mdsjack (http://www.mdsjack.bo.it)
    // +   improved by: Alexander Ermolaev (http://snippets.dzone.com/user/AlexanderErmolaev)
    // +      input by: Erkekjetter
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: DxGx
    // +   improved by: Steven Levithan (http://blog.stevenlevithan.com)
    // *     example 1: trim('    Kevin van Zonneveld    ');
    // *     returns 1: 'Kevin van Zonneveld'
    // *     example 2: trim('Hello World', 'Hdle');
    // *     returns 2: 'o Wor'
    if (!str) { return ''; }
    var whitespace;
    
    if(!charlist){
        whitespace = ' \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000';
    } else{
        whitespace = charlist.replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '\$1');
    }
  
	for (var i = 0; i < str.length; i++) {
		if (whitespace.indexOf(str.charAt(i)) === -1) {
		str = str.substring(i);
		break;
		}
	}
	for (i = str.length - 1; i >= 0; i--) {
		if (whitespace.indexOf(str.charAt(i)) === -1) {
			str = str.substring(0, i + 1);
			break;
    	}
	}
	return whitespace.indexOf(str.charAt(0)) === -1 ? str : '';
}// }}}


// {{{ wordwrap
function wordwrap( str, int_width, str_break, cut ) {
    // Wraps a string to a given number of characters
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_wordwrap/
    // +       version: 804.1715
    // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // +   improved by: Nick Callen
    // +    revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // *     example 1: wordwrap('Kevin van Zonneveld', 6, '|', true);
    // *     returns 1: 'Kevin |van |Zonnev|eld'
    
    var m = int_width, b = str_break, c = cut;
    var i, j, l, s, r;
    
    if(m < 1) {
        return str;
    }
    for(i = -1, l = (r = str.split("\n")).length; ++i < l; r[i] += s) {
        for(s = r[i], r[i] = ""; s.length > m; r[i] += s.slice(0, j) + ((s = s.slice(j)).length ? b : "")){
            j = c == 2 || (j = s.slice(0, m + 1).match(/\S*(\s)?$/))[1] ? m : j.input.length - j[0].length || c == 1 && m || j.input.length + (j = s.slice(m).match(/^\S*/)).input.length;
        }
    }
    
    return r.join("\n");
}// }}}

// {{{ is_string
function is_string( mixed_var ){
    // Find whether the type of a variable is string
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_is_string/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: is_string('23');
    // *     returns 1: true
    // *     example 2: is_string(23.5);
    // *     returns 2: false

    return (typeof( mixed_var ) == 'string');
}// }}}


// {{{ ord
function ord( string ) {
    // Return ASCII value of character
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_ord/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: ord('K');
    // *     returns 1: 75

    return string.charCodeAt(0);
}// }}}

// {{{ array_unique
function array_unique( array ) {
    // Removes duplicate values from an array
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_unique/
    // +       version: 805.211
    // +   original by: Carlos R. L. Rodrigues (http://www.jsfromhell.com)
    // +      input by: duncan
    // +    bufixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: array_unique(['Kevin','Kevin','van','Zonneveld']);
    // *     returns 1: ['Kevin','van','Zonneveld']

    var p, i, j, tmp_arr = array;
    for(i = tmp_arr.length; i;){
        for(p = --i; p > 0;){
            if(tmp_arr[i] === tmp_arr[--p]){
                for(j = p; --p && tmp_arr[i] === tmp_arr[p];);
                i -= tmp_arr.splice(p + 1, j - p).length;
            }
        }
    }

    return tmp_arr;
}// }}}

// {{{ print_r
function print_r( array, return_val ) {
    // Prints human-readable information about a variable
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_print_r/
    // +       version: 805.2023
    // +   original by: Michael White (http://crestidg.com)
    // +   improved by: Ben Bryan
    // *     example 1: print_r(1, true);
    // *     returns 1: 1

    var output = "", pad_char = " ", pad_val = 4;

    var formatArray = function (obj, cur_depth, pad_val, pad_char) {
        if (cur_depth > 0) {
            cur_depth++;
        }

        var base_pad = repeat_char(pad_val*cur_depth, pad_char);
        var thick_pad = repeat_char(pad_val*(cur_depth+1), pad_char);
        var str = "";

        if (obj instanceof Array || obj instanceof Object) {
            str += "Array\n" + base_pad + "(\n";
            for (var key in obj) {
                if (obj[key] instanceof Array || obj[key] instanceof Object) {
                    str += thick_pad + "["+key+"] => "+formatArray(obj[key], cur_depth+1, pad_val, pad_char);
                } else {
                    str += thick_pad + "["+key+"] => " + obj[key] + "\n";
                }
            }
            str += base_pad + ")\n";
        } else {
            str = obj.toString();
        }

        return str;
    };

    var repeat_char = function (len, pad_char) {
        var str = "";
        for(var i=0; i < len; i++) { 
            str += pad_char; 
        };
        return str;
    };
    output = formatArray(array, 0, pad_val, pad_char);

    if (return_val !== true) {
        document.write("<pre>" + output + "</pre>");
        return true;
    } else {
        return output;
    }
}// }}}
// {{{ is_array
function is_array( mixed_var ) {
    // Finds whether a variable is an array
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_is_array/
    // +       version: 804.1712
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Legaev Andrey
    // +   bugfixed by: Cord
    // *     example 1: is_array(['Kevin', 'van', 'Zonneveld']);
    // *     returns 1: true
    // *     example 2: is_array('Kevin van Zonneveld');
    // *     returns 2: false

    return ( mixed_var instanceof Array );
}// }}}

//------------END PHP FUNCTIONS --------------------------------------------------------------   //

/**
 * BibTex
 *
 * A class which provides common methods to access and
 * create Strings in BibTex format+
 * Example 1: Parsing a BibTex File and returning the number of entries
 * <code>
 * bibtex = new BibTex();
 * bibtex.content = '....';
 *
 * bibtex.parse();
 * print "There are "+bibtex.amount()+" entries";
 * </code>
 * Example 2: Parsing a BibTex File and getting all Titles
 * <code>
 * bibtex = new BibTex();
 * bibtex.content="...";
 * bibtex.parse();
 * for (var i in bibtex.data) {
 *  alert( bibtex.data[i]['title']+"<br />");
 * }
 * </code>
 * Example 3: Adding an entry and printing it in BibTex Format
 * <code>
 * bibtex                         = new BibTex();
 * addarray                       = {}
 * addarray['entryType']          = 'Article';
 * addarray['cite']               = 'art2';
 * addarray['title']              = 'Titel2';
 * addarray['author']			  = [];
 * addarray['author'][0]['first'] = 'John';
 * addarray['author'][0]['last']  = 'Doe';
 * addarray['author'][1]['first'] = 'Jane';
 * addarray['author'][1]['last']  = 'Doe';
 * bibtex.addEntry(addarray);
 * alert( nl2br(bibtex.bibTex()));
 * </code>
 *
 * @category   Structures
 * @package    BibTex
 * @author     Steve Hannah <shannah at sfu dot ca>
 * @adapted-from Structures_BibTex by  Elmar Pitschke <elmar+pitschke@gmx+de>
 * @copyright  2008 Simon Fraser University
 * @license    http://www.gnu.org/licenses/lgpl.html
 * @version    Release: 0.1
 * @link       http://webgroup.fas.sfu.ca/projects/JSBibTexParser
 */
function BibTex(options)
{

	if ( typeof options == 'undefined' ) options = {};
    /**
     * Array with the BibTex Data
     *
     * @access public
     * @var array
     */
    this.data;
    /**
     * String with the BibTex content
     *
     * @access public
     * @var string
     */
    this.content;
    /**
     * Array with possible Delimiters for the entries
     *
     * @access private
     * @var array
     */
    this._delimiters;
    /**
     * Array to store warnings
     *
     * @access public
     * @var array
     */
    this.warnings;
    /**
     * Run-time configuration options
     *
     * @access private
     * @var array
     */
    this._options;
    /**
     * RTF Format String
     *
     * @access public
     * @var string
     */
    this.rtfstring;
    /**
     * HTML Format String
     *
     * @access public
     * @var string
     */
    this.htmlstring;
    /**
     * Array with the "allowed" entry types
     *
     * @access public
     * @var array
     */
    this.allowedEntryTypes;
    /**
     * Author Format Strings
     *
     * @access public
     * @var string
     */
    this.authorstring;
    
    this._delimiters     = {'"':'"',
                                        '{':'}'};
	this.data            = [];
	this.content         = '';
	//this._stripDelimiter = stripDel;
	//this._validate       = val;
	this.warnings        = [];
	this._options        = {
		'stripDelimiter'    : true,
		'validate'          : true,
		'unwrap'            : false,
		'wordWrapWidth'     : false,
		'wordWrapBreak'     : "\n",
		'wordWrapCut'       : 0,
		'removeCurlyBraces' : false,
		'extractAuthors'    : true
	};
	for (option in options) {
		test = this.setOption(option, options[option]);
		if (this.isError(test)) {
			//Currently nothing is done here, but it could for example raise an warning
		}
	}
	this.rtfstring         = 'AUTHORS, "{\b TITLE}", {\i JOURNAL}, YEAR';
	this.htmlstring        = 'AUTHORS, "<strong>TITLE</strong>", <em>JOURNAL</em>, YEAR<br />';
	this.allowedEntryTypes = array(
		'article',
		'book',
		'booklet',
		'confernce',
		'inbook',
		'incollection',
		'inproceedings',
		'manual',
		'masterthesis',
		'misc',
		'phdthesis',
		'proceedings',
		'techreport',
		'unpublished'
	);
	this.authorstring = 'VON LAST, JR, FIRST';
    
}


BibTex.prototype = {
     
    /**
     * Constructor
     *
     * @access public
     * @return void
     */
   

    /**
     * Sets run-time configuration options
     *
     * @access public
     * @param string option option name
     * @param mixed  value value for the option
     * @return mixed true on success PEAR_Error on failure
     */
    setOption : function(option, value)
    {
        ret = true;
        if (array_key_exists(option, this._options)) {
            this._options[option] = value;
        } else {
            ret = this.raiseError('Unknown option '+option);
        }
        return ret;
    },

    /**
     * Reads a give BibTex File
     *
     * @access public
     * @param string filename Name of the file
     * @return mixed true on success PEAR_Error on failure
     *
    function loadFile(filename)
    {
        if (file_exists(filename)) {
            if ((this.content = @file_get_contents(filename)) === false) {
                return PEAR::raiseError('Could not open file '+filename);
            } else {
                this._pos    = 0;
                this._oldpos = 0;
                return true;
            }
        } else {
            return PEAR::raiseError('Could not find file '+filename);
        }
    }
	*/
    /**
     * Parses what is stored in content and clears the content if the parsing is successfull+
     *
     * @access public
     * @return boolean true on success and PEAR_Error if there was a problem
     */
    parse: function()
    {
    	//alert("starting to parse");
        //The amount of opening braces is compared to the amount of closing braces
        //Braces inside comments are ignored
        this.warnings = [];
        this.data     = [];
        var valid          = true;
        var open           = 0;
        var entry          = false;
        var charv           = '';
        var lastchar       = '';
        var buffer         = '';
        for (var i = 0; i < strlen(this.content); i++) {
            charv = substr(this.content, i, 1);
            if ((0 != open) && ('@' == charv)) {
                if (!this._checkAt(buffer)) {
                    this._generateWarning('WARNING_MISSING_END_BRACE', '', buffer);
                    //To correct the data we need to insert a closing brace
                    charv     = '}';
                    i--;
                }
            }
            if ((0 == open) && ('@' == charv)) { //The beginning of an entry
                entry = true;
            } else if (entry && ('{' == charv) && ('\\' != lastchar)) { //Inside an entry and non quoted brace is opening
                open++;
            } else if (entry && ('}' == charv) && ('\\' != lastchar)) { //Inside an entry and non quoted brace is closing
                open--;
                if (open < 0) { //More are closed than opened
                    valid = false;
                }
                if (0 == open) { //End of entry
                    entry     = false;
                    var entrydata = this._parseEntry(buffer);
                    if (!entrydata) {
                        /**
                         * This is not yet used+
                         * We are here if the Entry is either not correct or not supported+
                         * But this should already generate a warning+
                         * Therefore it should not be necessary to do anything here
                         */
                    } else {
                        this.data[this.data.length] = entrydata;
                    }
                    buffer = '';
                }
            }
            if (entry) { //Inside entry
                buffer += charv;
            }
            lastchar = charv;
        }
        //If open is one it may be possible that the last ending brace is missing
        if (1 == open) {
            entrydata = this._parseEntry(buffer);
            if (!entrydata) {
                valid = false;
            } else {
                this.data[this.data.length] = entrydata;
                buffer = '';
                open   = 0;
            }
        }
        //At this point the open should be zero
        if (0 != open) {
            valid = false;
        }
        //Are there Multiple entries with the same cite?
        if (this._options['validate']) {
            cites = [];
            for (var i=0; i< this.data.length; i++ ) {
                cites[cites.length] = this.data[i]['cite'];
            }
            unique = array_unique(cites);
            if (cites.length != sizeof(unique)) { //Some values have not been unique!
                notuniques = [];
                for (var i = 0; i < cites.length; i++) {
                    if ('' == unique[i]) {
                        notuniques[notuniques.length] = cites[i];
                    }
                }
                this._generateWarning('WARNING_MULTIPLE_ENTRIES', implode(',',notuniques));
            }
        }
        //alert("finished parsing");
        if (valid) {
            this.content = '';
            return true;
        } else {
            return this.raiseError('Unbalanced parenthesis');
        }
    },

    /**
     * Extracting the data of one content
     *
     * The parse function splits the content into its entries+
     * Then every entry is parsed by this function+
     * It parses the entry backwards+
     * First the last '=' is searched and the value extracted from that+
     * A copy is made of the entry if warnings should be generated+ This takes quite
     * some memory but it is needed to get good warnings+ If nor warnings are generated
     * then you don have to worry about memory+
     * Then the last ',' is searched and the field extracted from that+
     * Again the entry is shortened+
     * Finally after all field:value pairs the cite and type is extraced and the
     * authors are splitted+
     * If there is a problem false is returned+
     *
     * @access private
     * @param string entry The entry
     * @return array The representation of the entry or false if there is a problem
     */
    '_parseEntry': function(entry)
    {
        var entrycopy = '';
        if (this._options['validate']) {
            entrycopy = entry; //We need a copy for printing the warnings
        }
        var ret = {};
        if ('@string' ==  strtolower(substr(entry, 0, 7))) {
            //String are not yet supported!
            if (this._options['validate']) {
                this._generateWarning('STRING_ENTRY_NOT_YET_SUPPORTED', '', entry+'}');
            }
        } else if ('@preamble' ==  strtolower(substr(entry, 0, 9))) {
            //Preamble not yet supported!
            if (this._options['validate']) {
                this._generateWarning('PREAMBLE_ENTRY_NOT_YET_SUPPORTED', '', entry+'}');
            }
        } else {
            //Parsing all fields
            while (strrpos(entry,'=') !== false) {
                position = strrpos(entry, '=');
                //Checking that the equal sign is not quoted or is not inside a equation (For example in an abstract)
                proceed  = true;
                if (substr(entry, position-1, 1) == '\\') {
                    proceed = false;
                }
                if (proceed) {
                    proceed = this._checkEqualSign(entry, position);
                }
                while (!proceed) {
                    substring = substr(entry, 0, position);
                    position  = strrpos(substring,'=');
                    proceed   = true;
                    if (substr(entry, position-1, 1) == '\\') {
                        proceed = false;
                    }
                    if (proceed) {
                        proceed = this._checkEqualSign(entry, position);
                    }
                }

                value = trim(substr(entry, position+1));
                entry = substr(entry, 0, position);

                if (',' == substr(value, strlen(value)-1, 1)) {
                    value = substr(value, 0, -1);
                }
                if (this._options['validate']) {
                    this._validateValue(value, entrycopy);
                }
                if (this._options['stripDelimiter']) {
                    value = this._stripDelimiter(value);
                }
                if (this._options['unwrap']) {
                    value = this._unwrap(value);
                }
                if (this._options['removeCurlyBraces']) {
                    value = this._removeCurlyBraces(value);
                }
                position    = strrpos(entry, ',');
                field       = strtolower(trim(substr(entry, position+1)));
                ret[field] = value;
                entry       = substr(entry, 0, position);
            }
            //Parsing cite and entry type
            var arr = entry.split('{');
            ret['cite'] = trim(arr[1]);
            ret['entryType'] = strtolower(trim(arr[0]));
            //alert(array_keys(ret));
            if ('@' == ret['entryType'].substring(0,1)) {
                ret['entryType'] = substr(ret['entryType'], 1);
            }
            if (this._options['validate']) {
                if (!this._checkAllowedEntryType(ret['entryType'])) {
                    this._generateWarning('WARNING_NOT_ALLOWED_ENTRY_TYPE', ret['entryType'], entry+'}');
                }
            }
            //Handling the authors
            if (in_array('author', array_keys(ret)) && this._options['extractAuthors']) {
                ret['author'] = this._extractAuthors(ret['author']);
            }
        }
        return ret;
    },

    /**
     * Checking whether the position of the '=' is correct
     *
     * Sometimes there is a problem if a '=' is used inside an entry (for example abstract)+
     * This method checks if the '=' is outside braces then the '=' is correct and true is returned+
     * If the '=' is inside braces it contains to a equation and therefore false is returned+
     *
     * @access private
     * @param string entry The text of the whole remaining entry
     * @param int the current used place of the '='
     * @return bool true if the '=' is correct, false if it contains to an equation
     */
    '_checkEqualSign': function(entry, position)
    {
        var ret = true;
        //This is getting tricky
        //We check the string backwards until the position and count the closing an opening braces
        //If we reach the position the amount of opening and closing braces should be equal
        var length = strlen(entry);
        var open   = 0;
        for (var i = length-1; i >= position; i--) {
            precedingchar = substr(entry, i-1, 1);
            charv          = substr(entry, i, 1);
            if (('{' == charv) && ('\\' != precedingchar)) {
                open++;
            }
            if (('}' == charv) && ('\\' != precedingchar)) {
                open--;
            }
        }
        if (0 != open) {
            ret = false;
        }
        //There is still the posibility that the entry is delimited by double quotes+
        //Then it is possible that the braces are equal even if the '=' is in an equation+
        if (ret) {
            entrycopy = trim(entry);
            lastchar  = substr(entrycopy,strlen(entrycopy)-1,1);
            if (',' == lastchar) {
                lastchar = substr(entrycopy, strlen(entrycopy)-2, 1);
            }
            if ('"' == lastchar) {
                //The return value is set to false
                //If we find the closing " before the '=' it is set to true again+
                //Remember we begin to search the entry backwards so the " has to show up twice - ending and beginning delimiter
                ret = false;
                found = 0;
                for (var i = length; i >= position; i--) {
                    precedingchar = substr(entry, i-1, 1);
                    charv          = substr(entry, i, 1);
                    if (('"' == charv) && ('\\' != precedingchar)) {
                        found++;
                    }
                    if (2 == found) {
                        ret = true;
                        break;
                    }
                }
            }
        }
        return ret;
    },

    /**
     * Checking if the entry type is allowed
     *
     * @access private
     * @param string entry The entry to check
     * @return bool true if allowed, false otherwise
     */
    '_checkAllowedEntryType': function(entry)
    {
        return in_array(entry, this.allowedEntryTypes);
    },
    
    /**
     * Checking whether an at is outside an entry
     *
     * Sometimes an entry misses an entry brace+ Then the at of the next entry seems to be
     * inside an entry+ This is checked here+ When it is most likely that the at is an opening
     * at of the next entry this method returns true+
     *
     * @access private
     * @param string entry The text of the entry until the at
     * @return bool true if the at is correct, false if the at is likely to begin the next entry+
     */
    '_checkAt': function(entry)
    {
        var ret     = false;
        var opening = array_keys(this._delimiters);
        var closing = array_values(this._delimiters);
        //Getting the value (at is only allowd in values)
        if (strrpos(entry,'=') !== false) {
            position = strrpos(entry, '=');
            proceed  = true;
            if (substr(entry, position-1, 1) == '\\') {
                proceed = false;
            }
            while (!proceed) {
                substring = substr(entry, 0, position);
                position  = strrpos(substring,'=');
                proceed   = true;
                if (substr(entry, position-1, 1) == '\\') {
                    proceed = false;
                }
            }
            value    = trim(substr(entry, position+1));
            open     = 0;
            charv     = '';
            lastchar = '';
            for (var i = 0; i < strlen(value); i++) {
                charv = substr(this.content, i, 1);
                if (in_array(charv, opening) && ('\\' != lastchar)) {
                    open++;
                } else if (in_array(charv, closing) && ('\\' != lastchar)) {
                    open--;
                }
                lastchar = charv;
            }
            //if open is grater zero were are inside an entry
            if (open>0) {
                ret = true;
            }
        }
        return ret;
    },

    /**
     * Stripping Delimiter
     *
     * @access private
     * @param string entry The entry where the Delimiter should be stripped from
     * @return string Stripped entry
     */
    '_stripDelimiter': function(entry)
    {
        var beginningdels = array_keys(this._delimiters);
        var ength        = strlen(entry);
        var firstchar     = substr(entry, 0, 1);
        var lastchar      = substr(entry, -1, 1);
        while (in_array(firstchar, beginningdels)) { //The first character is an opening delimiter
            if (lastchar == this._delimiters[firstchar]) { //Matches to closing Delimiter
                entry = substr(entry, 1, -1);
            } else {
                break;
            }
            firstchar = substr(entry, 0, 1);
            lastchar  = substr(entry, -1, 1);
        }
        return entry;
    },

    /**
     * Unwrapping entry
     *
     * @access private
     * @param string entry The entry to unwrap
     * @return string unwrapped entry
     */
    '_unwrap': function(entry)
    {
        entry = entry.replace(/\s+/, ' ');
        return trim(entry);
    },

    /**
     * Wordwrap an entry
     *
     * @access private
     * @param string entry The entry to wrap
     * @return string wrapped entry
     */
    '_wordwrap': function(entry)
    {
        if ( (''!=entry) && (is_string(entry)) ) {
            entry = wordwrap(entry, this._options['wordWrapWidth'], this._options['wordWrapBreak'], this._options['wordWrapCut']);
        }
        return entry;
    },

    /**
     * Extracting the authors
     *
     * @access private
     * @param string entry The entry with the authors
     * @return array the extracted authors
     */
    '_extractAuthors': function(entry) {
        entry       = this._unwrap(entry);
        var authorarray = entry.split(' and ');
        for (var i = 0; i < authorarray.length; i++) {
            var author = trim(authorarray[i]);
            /*The first version of how an author could be written (First von Last)
             has no commas in it*/
            var first    = '';
            var von      = '';
            var last     = '';
            var jr       = '';
            if (strpos(author, ',') === false) {
                var tmparray = author.split(' |~');
                var size     = tmparray.length;
                if (1 == size) { //There is only a last
                    last = tmparray[0];
                } else if (2 == size) { //There is a first and a last
                    first = tmparray[0];
                    last  = tmparray[1];
                } else {
                    var invon  = false;
                    var inlast = false;
                    for (var j=0; j<(size-1); j++) {
                        if (inlast) {
                            last += ' '+tmparray[j];
                        } else if (invon) {
                            casev = this._determineCase(tmparray[j]);
                            if (this.isError(casev)) {
                                // IGNORE?
                            } else if ((0 == casev) || (-1 == casev)) { //Change from von to last
                                //You only change when there is no more lower case there
                                islast = true;
                                for (var k=(j+1); k<(size-1); k++) {
                                    futurecase = this._determineCase(tmparray[k]);
                                    if (this.isError(casev)) {
                                        // IGNORE?
                                    } else if (0 == futurecase) {
                                        islast = false;
                                    }
                                }
                                if (islast) {
                                    inlast = true;
                                    if (-1 == casev) { //Caseless belongs to the last
                                        last += ' '+tmparray[j];
                                    } else {
                                        von  += ' '+tmparray[j];
                                    }
                                } else {
                                    von    += ' '+tmparray[j];
                                }
                            } else {
                                von += ' '+tmparray[j];
                            }
                        } else {
                            var casev = this._determineCase(tmparray[j]);
                            if (this.isError(casev)) {
                                // IGNORE?
                            } else if (0 == casev) { //Change from first to von
                                invon = true;
                                von   += ' '+tmparray[j];
                            } else {
                                first += ' '+tmparray[j];
                            }
                        }
                    }
                    //The last entry is always the last!
                    last += ' '+tmparray[size-1];
                }
            } else { //Version 2 and 3
                var tmparray     = [];
                tmparray     = explode(',', author);
                //The first entry must contain von and last
                vonlastarray = [];
                vonlastarray = explode(' ', tmparray[0]);
                size         = sizeof(vonlastarray);
                if (1==size) { //Only one entry.got to be the last
                    last = vonlastarray[0];
                } else {
                    inlast = false;
                    for (var j=0; j<(size-1); j++) {
                        if (inlast) {
                            last += ' '+vonlastarray[j];
                        } else {
                            if (0 != (this._determineCase(vonlastarray[j]))) { //Change from von to last
                                islast = true;
                                for (var k=(j+1); k<(size-1); k++) {
                                    this._determineCase(vonlastarray[k]);
                                    casev = this._determineCase(vonlastarray[k]);
                                    if (this.isError(casev)) {
                                        // IGNORE?
                                    } else if (0 == casev) {
                                        islast = false;
                                    }
                                }
                                if (islast) {
                                    inlast = true;
                                    last   += ' '+vonlastarray[j];
                                } else {
                                    von    += ' '+vonlastarray[j];
                                }
                            } else {
                                von    += ' '+vonlastarray[j];
                            }
                        }
                    }
                    last += ' '+vonlastarray[size-1];
                }
                //Now we check if it is version three (three entries in the array (two commas)
                if (3==tmparray.length) {
                    jr = tmparray[1];
                }
                //Everything in the last entry is first
                first = tmparray[tmparray.length-1];
            }
            authorarray[i] = {'first':trim(first), 'von':trim(von), 'last':trim(last), 'jr':trim(jr)};
        }
        return authorarray;
    },

    /**
     * Case Determination according to the needs of BibTex
     *
     * To parse the Author(s) correctly a determination is needed
     * to get the Case of a word+ There are three possible values:
     * - Upper Case (return value 1)
     * - Lower Case (return value 0)
     * - Caseless   (return value -1)
     *
     * @access private
     * @param string word
     * @return int The Case or PEAR_Error if there was a problem
     */
    '_determineCase': function(word) {
        var ret         = -1;
        var trimmedword = trim (word);
        /*We need this variable+ Without the next of would not work
         (trim changes the variable automatically to a string!)*/
        if (is_string(word) && (strlen(trimmedword) > 0)) {
            var i         = 0;
            var found     = false;
            var openbrace = 0;
            while (!found && (i <= strlen(word))) {
                var letter = substr(trimmedword, i, 1);
                var ordv    = ord(letter);
                if (ordv == 123) { //Open brace
                    openbrace++;
                }
                if (ordv == 125) { //Closing brace
                    openbrace--;
                }
                if ((ordv>=65) && (ordv<=90) && (0==openbrace)) { //The first character is uppercase
                    ret   = 1;
                    found = true;
                } else if ( (ordv>=97) && (ordv<=122) && (0==openbrace) ) { //The first character is lowercase
                    ret   = 0;
                    found = true;
                } else { //Not yet found
                    i++;
                }
            }
        } else {
            ret = this.raiseError('Could not determine case on word: '+word);
        }
        return ret;
    },
    
    
    'isError': function(obj){
    	return ( typeof(obj) == 'Object' && obj.isError == 1 );
    
    },

    /**
     * Validation of a value
     *
     * There may be several problems with the value of a field+
     * These problems exist but do not break the parsing+
     * If a problem is detected a warning is appended to the array warnings+
     *
     * @access private
     * @param string entry The entry aka one line which which should be validated
     * @param string wholeentry The whole BibTex Entry which the one line is part of
     * @return void
     */
    '_validateValue': function(entry, wholeentry)
    {
        //There is no @ allowed if the entry is enclosed by braces
        if ( entry.match(/^{.*@.*}/)) {
            this._generateWarning('WARNING_AT_IN_BRACES', entry, wholeentry);
        }
        //No escaped " allowed if the entry is enclosed by double quotes
        if (entry.match(/^\".*\\".*\"/)) {
            this._generateWarning('WARNING_ESCAPED_DOUBLE_QUOTE_INSIDE_DOUBLE_QUOTES', entry, wholeentry);
        }
        //Amount of Braces is not correct
        var open     = 0;
        var lastchar = '';
        var charv     = '';
        for (var i = 0; i < strlen(entry); i++) {
            charv = substr(entry, i, 1);
            if (('{' == charv) && ('\\' != lastchar)) {
                open++;
            }
            if (('}' == charv) && ('\\' != lastchar)) {
                open--;
            }
            lastchar = charv;
        }
        if (0 != open) {
            this._generateWarning('WARNING_UNBALANCED_AMOUNT_OF_BRACES', entry, wholeentry);
        }
    },

    /**
     * Remove curly braces from entry
     *
     * @access private
     * @param string value The value in which curly braces to be removed
     * @param string Value with removed curly braces
     */
    '_removeCurlyBraces': function(value)
    {
        //First we save the delimiters
        var beginningdels = array_keys(this._delimiters);
        var firstchar     = substr(value, 0, 1);
        var lastchar      = substr(value, -1, 1);
        var begin         = '';
        var end           = '';
        while (in_array(firstchar, beginningdels)) { //The first character is an opening delimiter
            if (lastchar == this._delimiters[firstchar]) { //Matches to closing Delimiter
                begin += firstchar;
                end   += lastchar;
                value  = substr(value, 1, -1);
            } else {
                break;
            }
            firstchar = substr(value, 0, 1);
            lastchar  = substr(value, -1, 1);
        }
        //Now we get rid of the curly braces
        var pattern     = '/([^\\\\])\{(+*?[^\\\\])\}/';
        var replacement = '12';
        value       = value.replace(/([^\\\\])\{(.*?[^\\\\])\}/, replacement);
        //Reattach delimiters
        value       = begin+value+end;
        return value;
    },
    
    /**
     * Generates a warning
     *
     * @access private
     * @param string type The type of the warning
     * @param string entry The line of the entry where the warning occurred
     * @param string wholeentry OPTIONAL The whole entry where the warning occurred
     */
    '_generateWarning': function(type, entry, wholeentry)
    {
    	if ( typeof wholeentry == 'undefined' ) wholeentry = '';
        var warning = {};
        warning['warning']    = type;
        warning['entry']      = entry;
        warning['wholeentry'] = wholeentry;
        this.warnings[this.warnings.length]      = warning;
    },

    /**
     * Cleares all warnings
     *
     * @access public
     */
    'clearWarnings': function()
    {
        this.warnings = array();
    },

    /**
     * Is there a warning?
     *
     * @access public
     * @return true if there is, false otherwise
     */
    'hasWarning': function()
    {
        if (sizeof(this.warnings)>0) return true;
        else return false;
    },

    /**
     * Returns the amount of available BibTex entries
     *
     * @access public
     * @return int The amount of available BibTex entries
     */
    'amount': function()
    {
        return sizeof(this.data);
    },
    /**
     * Returns the author formatted
     *
     * The Author is formatted as setted in the authorstring
     *
     * @access private
     * @param array array Author array
     * @return string the formatted author string
     */
    '_formatAuthor': function(array)
    {
        if (!array_key_exists('von', array)) {
            array['von'] = '';
        } else {
            array['von'] = trim(array['von']);
        }
        if (!array_key_exists('last', array)) {
            array['last'] = '';
        } else {
            array['last'] = trim(array['last']);
        }
        if (!array_key_exists('jr', array)) {
            array['jr'] = '';
        } else {
            array['jr'] = trim(array['jr']);
        }
        if (!array_key_exists('first', array)) {
            array['first'] = '';
        } else {
            array['first'] = trim(array['first']);
        }
        ret = this.authorstring;
        ret = str_replace("VON", array['von'], ret);
        ret = str_replace("LAST", array['last'], ret);
        ret = str_replace("JR", array['jr'], ret);
        ret = str_replace("FIRST", array['first'], ret);
        return trim(ret);
    },

    /**
     * Converts the stored BibTex entries to a BibTex String
     *
     * In the field list, the author is the last field+
     *
     * @access public
     * @return string The BibTex string
     */
    'bibTex': function()
    {
        var bibtex = '';
        for (var i=0 ; i<this.data.length; i++) {
        	var entry = this.data[i];
            //Intro
            bibtex += '@'+strtolower(entry['entryType'])+' { '+entry['cite']+",\n";
            //Other fields except author
            for (key in entry) {
            	var val = entry[key];
                if (this._options['wordWrapWidth']>0) {
                    val = this._wordWrap(val);
                }
                if (!in_array(key, array('cite','entryType','author'))) {
                    bibtex += "\t"+key+' = {'+val+"},\n";
                }
            }
            //Author
            if (array_key_exists('author', entry)) {
                if (this._options['extractAuthors']) {
                    tmparray = []; //In this array the authors are saved and the joind with an and
                    for (j in entry['author']) {
                    	var authorentry = entry['author'][j];
                        tmparray[tmparray.length] = this._formatAuthor(authorentry);
                    }
                    author = join(' and ', tmparray);
                } else {
                    author = entry['author'];
                }
            } else {
                author = '';
            }
            bibtex += "\tauthor = {"+author+"}\n";
            bibtex+="}\n\n";
        }
        return bibtex;
    },

    /**
     * Adds a new BibTex entry to the data
     *
     * @access public
     * @param array newentry The new data to add
     * @return void
     */
    'addEntry': function(newentry)
    {
        this.data[this.data.length] = newentry;
    },

    /**
     * Returns statistic
     *
     * This functions returns a hash table+ The keys are the different
     * entry types and the values are the amount of these entries+
     *
     * @access public
     * @return array Hash Table with the data
     */
    'getStatistic': function()
    {
        var ret = array();
        for (var i=0; i<this.data.length; i++) {
        	var entry = this.data[i];
            if (array_key_exists(entry['entryType'], ret)) {
                ret[entry['entryType']]++;
            } else {
                ret[entry['entryType']] = 1;
            }
        }
        return ret;
    },
    
    /**
     * Returns the stored data in RTF format
     *
     * This method simply returns a RTF formatted string+ This is done very
     * simple and is not intended for heavy using and fine formatting+ This
     * should be done by BibTex! It is intended to give some kind of quick
     * preview or to send someone a reference list as word/rtf format (even
     * some people in the scientific field still use word)+ If you want to
     * change the default format you have to override the class variable
     * "rtfstring"+ This variable is used and the placeholders simply replaced+
     * Lines with no data cause an warning!
     *
     * @return string the RTF Strings
     */
    'rtf': function()
    {
        var ret = "{\\rtf\n";
        for (var i=0; i<this.data.length; i++) {
        	var entry = this.data[i];
            line    = this.rtfstring;
            title   = '';
            journal = '';
            year    = '';
            authors = '';
            if (array_key_exists('title', entry)) {
                title = this._unwrap(entry['title']);
            }
            if (array_key_exists('journal', entry)) {
                journal = this._unwrap(entry['journal']);
            }
            if (array_key_exists('year', entry)) {
                year = this._unwrap(entry['year']);
            }
            if (array_key_exists('author', entry)) {
                if (this._options['extractAuthors']) {
                    tmparray = []; //In this array the authors are saved and the joind with an and
                    for (var j in entry['author']) {
                    	var authorentry = entry['author'][j];
                        tmparray[tmparray.length] = this._formatAuthor(authorentry);
                    }
                    authors = join(', ', tmparray);
                } else {
                    authors = entry['author'];
                }
            }
            if ((''!=title) || (''!=journal) || (''!=year) || (''!=authors)) {
                line = str_replace("TITLE", title, line);
                line = str_replace("JOURNAL", journal, line);
                line = str_replace("YEAR", year, line);
                line = str_replace("AUTHORS", authors, line);
                line += "\n\\par\n";
                ret  += line;
            } else {
                this._generateWarning('WARNING_LINE_WAS_NOT_CONVERTED', '', print_r(entry,1));
            }
        }
        ret += '}';
        return ret;
    },

    /**
     * Returns the stored data in HTML format
     *
     * This method simply returns a HTML formatted string+ This is done very
     * simple and is not intended for heavy using and fine formatting+ This
     * should be done by BibTex! It is intended to give some kind of quick
     * preview+ If you want to change the default format you have to override
     * the class variable "htmlstring"+ This variable is used and the placeholders
     * simply replaced+
     * Lines with no data cause an warning!
     *
     * @return string the HTML Strings
     */
    'html': function(min,max)
    {
    	if ( typeof min == 'undefined' ) min = 0;
    	if ( typeof max == 'undefined' ) max = this.data.length;
        var ret = "<p>\n";
        for (var i =min; i<max; i++){
        	var entry = this.data[i];
            var line    = this.htmlstring;
            var title   = '';
            var journal = '';
            var year    = '';
            var authors = '';
            if (array_key_exists('title', entry)) {
                title = this._unwrap(entry['title']);
            }
            if (array_key_exists('journal', entry)) {
                journal = this._unwrap(entry['journal']);
            }
            if (array_key_exists('year', entry)) {
                year = this._unwrap(entry['year']);
            }
            if (array_key_exists('author', entry)) {
                if (this._options['extractAuthors']) {
                    tmparray = []; //In this array the authors are saved and the joind with an and
                    for (j in entry['author'] ) {
                    	var authorentry = entry['author'][j];
                        tmparray[tmparray.length] = this._formatAuthor(authorentry);
                    }
                    authors = join(', ', tmparray);
                } else {
                    authors = entry['author'];
                }
            }
            
            if ((''!=title) || (''!=journal) || (''!=year) || (''!=authors)) {
                line = str_replace("TITLE", title, line);
                line = str_replace("JOURNAL", journal, line);
                line = str_replace("YEAR", year, line);
                line = str_replace("AUTHORS", authors, line);
                line += "\n";
                ret  += line;
            } else {
                this._generateWarning('WARNING_LINE_WAS_NOT_CONVERTED', '', print_r(entry,1));
            }
        }
        ret += "</p>\n";
        return ret;
    }
};/*!
 * File:        jquery.dataTables.min.js
 * Version:     1.6.2
 * Author:      Allan Jardine (www.sprymedia.co.uk)
 * Info:        www.datatables.net
 * 
 * Copyright 2008-2010 Allan Jardine, all rights reserved.
 *
 * This source file is free software, under either the GPL v2 license or a
 * BSD style license, as supplied with this software.
 * 
 * This source file is distributed in the hope that it will be useful, but 
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY 
 * or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
 */
(function($){$.fn.dataTableSettings=[];var _aoSettings=$.fn.dataTableSettings;$.fn.dataTableExt={};
var _oExt=$.fn.dataTableExt;_oExt.sVersion="1.6.2";_oExt.iApiIndex=0;_oExt.oApi={};
_oExt.afnFiltering=[];_oExt.aoFeatures=[];_oExt.ofnSearch={};_oExt.afnSortData=[];
_oExt.oStdClasses={sPagePrevEnabled:"paginate_enabled_previous",sPagePrevDisabled:"paginate_disabled_previous",sPageNextEnabled:"paginate_enabled_next",sPageNextDisabled:"paginate_disabled_next",sPageJUINext:"",sPageJUIPrev:"",sPageButton:"paginate_button",sPageButtonActive:"paginate_active",sPageButtonStaticDisabled:"paginate_button",sPageFirst:"first",sPagePrevious:"previous",sPageNext:"next",sPageLast:"last",sStripOdd:"odd",sStripEven:"even",sRowEmpty:"dataTables_empty",sWrapper:"dataTables_wrapper",sFilter:"dataTables_filter",sInfo:"dataTables_info",sPaging:"dataTables_paginate paging_",sLength:"dataTables_length",sProcessing:"dataTables_processing",sSortAsc:"sorting_asc",sSortDesc:"sorting_desc",sSortable:"sorting",sSortableAsc:"sorting_asc_disabled",sSortableDesc:"sorting_desc_disabled",sSortableNone:"sorting_disabled",sSortColumn:"sorting_",sSortJUIAsc:"",sSortJUIDesc:"",sSortJUI:"",sSortJUIAscAllowed:"",sSortJUIDescAllowed:""};
_oExt.oJUIClasses={sPagePrevEnabled:"fg-button ui-state-default ui-corner-left",sPagePrevDisabled:"fg-button ui-state-default ui-corner-left ui-state-disabled",sPageNextEnabled:"fg-button ui-state-default ui-corner-right",sPageNextDisabled:"fg-button ui-state-default ui-corner-right ui-state-disabled",sPageJUINext:"ui-icon ui-icon-circle-arrow-e",sPageJUIPrev:"ui-icon ui-icon-circle-arrow-w",sPageButton:"fg-button ui-state-default",sPageButtonActive:"fg-button ui-state-default ui-state-disabled",sPageButtonStaticDisabled:"fg-button ui-state-default ui-state-disabled",sPageFirst:"first ui-corner-tl ui-corner-bl",sPagePrevious:"previous",sPageNext:"next",sPageLast:"last ui-corner-tr ui-corner-br",sStripOdd:"odd",sStripEven:"even",sRowEmpty:"dataTables_empty",sWrapper:"dataTables_wrapper",sFilter:"dataTables_filter",sInfo:"dataTables_info",sPaging:"dataTables_paginate fg-buttonset fg-buttonset-multi paging_",sLength:"dataTables_length",sProcessing:"dataTables_processing",sSortAsc:"ui-state-default",sSortDesc:"ui-state-default",sSortable:"ui-state-default",sSortableAsc:"ui-state-default",sSortableDesc:"ui-state-default",sSortableNone:"ui-state-default",sSortColumn:"sorting_",sSortJUIAsc:"css_right ui-icon ui-icon-triangle-1-n",sSortJUIDesc:"css_right ui-icon ui-icon-triangle-1-s",sSortJUI:"css_right ui-icon ui-icon-carat-2-n-s",sSortJUIAscAllowed:"css_right ui-icon ui-icon-carat-1-n",sSortJUIDescAllowed:"css_right ui-icon ui-icon-carat-1-s"};
_oExt.oPagination={two_button:{fnInit:function(oSettings,nPaging,fnCallbackDraw){var nPrevious,nNext,nPreviousInner,nNextInner;
if(!oSettings.bJUI){nPrevious=document.createElement("div");nNext=document.createElement("div")
}else{nPrevious=document.createElement("a");nNext=document.createElement("a");nNextInner=document.createElement("span");
nNextInner.className=oSettings.oClasses.sPageJUINext;nNext.appendChild(nNextInner);
nPreviousInner=document.createElement("span");nPreviousInner.className=oSettings.oClasses.sPageJUIPrev;
nPrevious.appendChild(nPreviousInner)}nPrevious.className=oSettings.oClasses.sPagePrevDisabled;
nNext.className=oSettings.oClasses.sPageNextDisabled;nPrevious.title=oSettings.oLanguage.oPaginate.sPrevious;
nNext.title=oSettings.oLanguage.oPaginate.sNext;nPaging.appendChild(nPrevious);nPaging.appendChild(nNext);
$(nPrevious).click(function(){if(oSettings.oApi._fnPageChange(oSettings,"previous")){fnCallbackDraw(oSettings)
}});$(nNext).click(function(){if(oSettings.oApi._fnPageChange(oSettings,"next")){fnCallbackDraw(oSettings)
}});$(nPrevious).bind("selectstart",function(){return false});$(nNext).bind("selectstart",function(){return false
});if(oSettings.sTableId!==""&&typeof oSettings.aanFeatures.p=="undefined"){nPaging.setAttribute("id",oSettings.sTableId+"_paginate");
nPrevious.setAttribute("id",oSettings.sTableId+"_previous");nNext.setAttribute("id",oSettings.sTableId+"_next")
}},fnUpdate:function(oSettings,fnCallbackDraw){if(!oSettings.aanFeatures.p){return
}var an=oSettings.aanFeatures.p;for(var i=0,iLen=an.length;i<iLen;i++){if(an[i].childNodes.length!==0){an[i].childNodes[0].className=(oSettings._iDisplayStart===0)?oSettings.oClasses.sPagePrevDisabled:oSettings.oClasses.sPagePrevEnabled;
an[i].childNodes[1].className=(oSettings.fnDisplayEnd()==oSettings.fnRecordsDisplay())?oSettings.oClasses.sPageNextDisabled:oSettings.oClasses.sPageNextEnabled
}}}},iFullNumbersShowPages:5,full_numbers:{fnInit:function(oSettings,nPaging,fnCallbackDraw){var nFirst=document.createElement("span");
var nPrevious=document.createElement("span");var nList=document.createElement("span");
var nNext=document.createElement("span");var nLast=document.createElement("span");
nFirst.innerHTML=oSettings.oLanguage.oPaginate.sFirst;nPrevious.innerHTML=oSettings.oLanguage.oPaginate.sPrevious;
nNext.innerHTML=oSettings.oLanguage.oPaginate.sNext;nLast.innerHTML=oSettings.oLanguage.oPaginate.sLast;
var oClasses=oSettings.oClasses;nFirst.className=oClasses.sPageButton+" "+oClasses.sPageFirst;
nPrevious.className=oClasses.sPageButton+" "+oClasses.sPagePrevious;nNext.className=oClasses.sPageButton+" "+oClasses.sPageNext;
nLast.className=oClasses.sPageButton+" "+oClasses.sPageLast;nPaging.appendChild(nFirst);
nPaging.appendChild(nPrevious);nPaging.appendChild(nList);nPaging.appendChild(nNext);
nPaging.appendChild(nLast);$(nFirst).click(function(){if(oSettings.oApi._fnPageChange(oSettings,"first")){fnCallbackDraw(oSettings)
}});$(nPrevious).click(function(){if(oSettings.oApi._fnPageChange(oSettings,"previous")){fnCallbackDraw(oSettings)
}});$(nNext).click(function(){if(oSettings.oApi._fnPageChange(oSettings,"next")){fnCallbackDraw(oSettings)
}});$(nLast).click(function(){if(oSettings.oApi._fnPageChange(oSettings,"last")){fnCallbackDraw(oSettings)
}});$("span",nPaging).bind("mousedown",function(){return false}).bind("selectstart",function(){return false
});if(oSettings.sTableId!==""&&typeof oSettings.aanFeatures.p=="undefined"){nPaging.setAttribute("id",oSettings.sTableId+"_paginate");
nFirst.setAttribute("id",oSettings.sTableId+"_first");nPrevious.setAttribute("id",oSettings.sTableId+"_previous");
nNext.setAttribute("id",oSettings.sTableId+"_next");nLast.setAttribute("id",oSettings.sTableId+"_last")
}},fnUpdate:function(oSettings,fnCallbackDraw){if(!oSettings.aanFeatures.p){return
}var iPageCount=_oExt.oPagination.iFullNumbersShowPages;var iPageCountHalf=Math.floor(iPageCount/2);
var iPages=Math.ceil((oSettings.fnRecordsDisplay())/oSettings._iDisplayLength);var iCurrentPage=Math.ceil(oSettings._iDisplayStart/oSettings._iDisplayLength)+1;
var sList="";var iStartButton,iEndButton,i,iLen;var oClasses=oSettings.oClasses;if(iPages<iPageCount){iStartButton=1;
iEndButton=iPages}else{if(iCurrentPage<=iPageCountHalf){iStartButton=1;iEndButton=iPageCount
}else{if(iCurrentPage>=(iPages-iPageCountHalf)){iStartButton=iPages-iPageCount+1;
iEndButton=iPages}else{iStartButton=iCurrentPage-Math.ceil(iPageCount/2)+1;iEndButton=iStartButton+iPageCount-1
}}}for(i=iStartButton;i<=iEndButton;i++){if(iCurrentPage!=i){sList+='<span class="'+oClasses.sPageButton+'">'+i+"</span>"
}else{sList+='<span class="'+oClasses.sPageButtonActive+'">'+i+"</span>"}}var an=oSettings.aanFeatures.p;
var anButtons,anStatic,nPaginateList;var fnClick=function(){var iTarget=(this.innerHTML*1)-1;
oSettings._iDisplayStart=iTarget*oSettings._iDisplayLength;fnCallbackDraw(oSettings);
return false};var fnFalse=function(){return false};for(i=0,iLen=an.length;i<iLen;
i++){if(an[i].childNodes.length===0){continue}nPaginateList=an[i].childNodes[2];nPaginateList.innerHTML=sList;
$("span",nPaginateList).click(fnClick).bind("mousedown",fnFalse).bind("selectstart",fnFalse);
anButtons=an[i].getElementsByTagName("span");anStatic=[anButtons[0],anButtons[1],anButtons[anButtons.length-2],anButtons[anButtons.length-1]];
$(anStatic).removeClass(oClasses.sPageButton+" "+oClasses.sPageButtonActive+" "+oClasses.sPageButtonStaticDisabled);
if(iCurrentPage==1){anStatic[0].className+=" "+oClasses.sPageButtonStaticDisabled;
anStatic[1].className+=" "+oClasses.sPageButtonStaticDisabled}else{anStatic[0].className+=" "+oClasses.sPageButton;
anStatic[1].className+=" "+oClasses.sPageButton}if(iPages===0||iCurrentPage==iPages||oSettings._iDisplayLength==-1){anStatic[2].className+=" "+oClasses.sPageButtonStaticDisabled;
anStatic[3].className+=" "+oClasses.sPageButtonStaticDisabled}else{anStatic[2].className+=" "+oClasses.sPageButton;
anStatic[3].className+=" "+oClasses.sPageButton}}}}};_oExt.oSort={"string-asc":function(a,b){var x=a.toLowerCase();
var y=b.toLowerCase();return((x<y)?-1:((x>y)?1:0))},"string-desc":function(a,b){var x=a.toLowerCase();
var y=b.toLowerCase();return((x<y)?1:((x>y)?-1:0))},"html-asc":function(a,b){var x=a.replace(/<.*?>/g,"").toLowerCase();
var y=b.replace(/<.*?>/g,"").toLowerCase();return((x<y)?-1:((x>y)?1:0))},"html-desc":function(a,b){var x=a.replace(/<.*?>/g,"").toLowerCase();
var y=b.replace(/<.*?>/g,"").toLowerCase();return((x<y)?1:((x>y)?-1:0))},"date-asc":function(a,b){var x=Date.parse(a);
var y=Date.parse(b);if(isNaN(x)){x=Date.parse("01/01/1970 00:00:00")}if(isNaN(y)){y=Date.parse("01/01/1970 00:00:00")
}return x-y},"date-desc":function(a,b){var x=Date.parse(a);var y=Date.parse(b);if(isNaN(x)){x=Date.parse("01/01/1970 00:00:00")
}if(isNaN(y)){y=Date.parse("01/01/1970 00:00:00")}return y-x},"numeric-asc":function(a,b){var x=a=="-"?0:a;
var y=b=="-"?0:b;return x-y},"numeric-desc":function(a,b){var x=a=="-"?0:a;var y=b=="-"?0:b;
return y-x}};_oExt.aTypes=[function(sData){if(typeof sData=="number"){return"numeric"
}else{if(typeof sData.charAt!="function"){return null}}var sValidFirstChars="0123456789-";
var sValidChars="0123456789.";var Char;var bDecimal=false;Char=sData.charAt(0);if(sValidFirstChars.indexOf(Char)==-1){return null
}for(var i=1;i<sData.length;i++){Char=sData.charAt(i);if(sValidChars.indexOf(Char)==-1){return null
}if(Char=="."){if(bDecimal){return null}bDecimal=true}}return"numeric"},function(sData){var iParse=Date.parse(sData);
if(iParse!==null&&!isNaN(iParse)){return"date"}return null}];_oExt._oExternConfig={iNextUnique:0};
$.fn.dataTable=function(oInit){function classSettings(){this.fnRecordsTotal=function(){if(this.oFeatures.bServerSide){return this._iRecordsTotal
}else{return this.aiDisplayMaster.length}};this.fnRecordsDisplay=function(){if(this.oFeatures.bServerSide){return this._iRecordsDisplay
}else{return this.aiDisplay.length}};this.fnDisplayEnd=function(){if(this.oFeatures.bServerSide){return this._iDisplayStart+this.aiDisplay.length
}else{return this._iDisplayEnd}};this.sInstance=null;this.oFeatures={bPaginate:true,bLengthChange:true,bFilter:true,bSort:true,bInfo:true,bAutoWidth:true,bProcessing:false,bSortClasses:true,bStateSave:false,bServerSide:false};
this.aanFeatures=[];this.oLanguage={sProcessing:"Processing...",sLengthMenu:"Show _MENU_ entries",sZeroRecords:"No matching records found",sInfo:"Showing _START_ to _END_ of _TOTAL_ entries",sInfoEmpty:"Showing 0 to 0 of 0 entries",sInfoFiltered:"(filtered from _MAX_ total entries)",sInfoPostFix:"",sSearch:"Search:",sUrl:"",oPaginate:{sFirst:"First",sPrevious:"Previous",sNext:"Next",sLast:"Last"}};
this.aoData=[];this.aiDisplay=[];this.aiDisplayMaster=[];this.aoColumns=[];this.iNextId=0;
this.asDataSearch=[];this.oPreviousSearch={sSearch:"",bEscapeRegex:true};this.aoPreSearchCols=[];
this.aaSorting=[[0,"asc",0]];this.aaSortingFixed=null;this.asStripClasses=[];this.fnRowCallback=null;
this.fnHeaderCallback=null;this.fnFooterCallback=null;this.aoDrawCallback=[];this.fnInitComplete=null;
this.sTableId="";this.nTable=null;this.iDefaultSortIndex=0;this.bInitialised=false;
this.aoOpenRows=[];this.sDom="lfrtip";this.sPaginationType="two_button";this.iCookieDuration=60*60*2;
this.sAjaxSource=null;this.bAjaxDataGet=true;this.fnServerData=$.getJSON;this.iServerDraw=0;
this._iDisplayLength=10;this._iDisplayStart=0;this._iDisplayEnd=10;this._iRecordsTotal=0;
this._iRecordsDisplay=0;this.bJUI=false;this.oClasses=_oExt.oStdClasses;this.bFiltered=false;
this.bSorted=false}this.oApi={};this.fnDraw=function(bComplete){var oSettings=_fnSettingsFromNode(this[_oExt.iApiIndex]);
if(typeof bComplete!="undefined"&&bComplete===false){_fnCalculateEnd(oSettings);_fnDraw(oSettings)
}else{_fnReDraw(oSettings)}};this.fnFilter=function(sInput,iColumn,bEscapeRegex){var oSettings=_fnSettingsFromNode(this[_oExt.iApiIndex]);
if(typeof bEscapeRegex=="undefined"){bEscapeRegex=true}if(typeof iColumn=="undefined"||iColumn===null){_fnFilterComplete(oSettings,{sSearch:sInput,bEscapeRegex:bEscapeRegex},1)
}else{oSettings.aoPreSearchCols[iColumn].sSearch=sInput;oSettings.aoPreSearchCols[iColumn].bEscapeRegex=bEscapeRegex;
_fnFilterComplete(oSettings,oSettings.oPreviousSearch,1)}};this.fnSettings=function(nNode){return _fnSettingsFromNode(this[_oExt.iApiIndex])
};this.fnVersionCheck=function(sVersion){var fnZPad=function(Zpad,count){while(Zpad.length<count){Zpad+="0"
}return Zpad};var aThis=_oExt.sVersion.split(".");var aThat=sVersion.split(".");var sThis="",sThat="";
for(var i=0,iLen=aThat.length;i<iLen;i++){sThis+=fnZPad(aThis[i],3);sThat+=fnZPad(aThat[i],3)
}return parseInt(sThis,10)>=parseInt(sThat,10)};this.fnSort=function(aaSort){var oSettings=_fnSettingsFromNode(this[_oExt.iApiIndex]);
oSettings.aaSorting=aaSort;_fnSort(oSettings)};this.fnSortListener=function(nNode,iColumn,fnCallback){_fnSortAttachListener(_fnSettingsFromNode(this[_oExt.iApiIndex]),nNode,iColumn,fnCallback)
};this.fnAddData=function(mData,bRedraw){if(mData.length===0){return[]}var aiReturn=[];
var iTest;var oSettings=_fnSettingsFromNode(this[_oExt.iApiIndex]);if(typeof mData[0]=="object"){for(var i=0;
i<mData.length;i++){iTest=_fnAddData(oSettings,mData[i]);if(iTest==-1){return aiReturn
}aiReturn.push(iTest)}}else{iTest=_fnAddData(oSettings,mData);if(iTest==-1){return aiReturn
}aiReturn.push(iTest)}oSettings.aiDisplay=oSettings.aiDisplayMaster.slice();_fnBuildSearchArray(oSettings,1);
if(typeof bRedraw=="undefined"||bRedraw){_fnReDraw(oSettings)}return aiReturn};this.fnDeleteRow=function(mTarget,fnCallBack,bNullRow){var oSettings=_fnSettingsFromNode(this[_oExt.iApiIndex]);
var i,iAODataIndex;iAODataIndex=(typeof mTarget=="object")?_fnNodeToDataIndex(oSettings,mTarget):mTarget;
for(i=0;i<oSettings.aiDisplayMaster.length;i++){if(oSettings.aiDisplayMaster[i]==iAODataIndex){oSettings.aiDisplayMaster.splice(i,1);
break}}for(i=0;i<oSettings.aiDisplay.length;i++){if(oSettings.aiDisplay[i]==iAODataIndex){oSettings.aiDisplay.splice(i,1);
break}}_fnBuildSearchArray(oSettings,1);if(typeof fnCallBack=="function"){fnCallBack.call(this)
}if(oSettings._iDisplayStart>=oSettings.aiDisplay.length){oSettings._iDisplayStart-=oSettings._iDisplayLength;
if(oSettings._iDisplayStart<0){oSettings._iDisplayStart=0}}_fnCalculateEnd(oSettings);
_fnDraw(oSettings);var aData=oSettings.aoData[iAODataIndex]._aData.slice();if(typeof bNullRow!="undefined"&&bNullRow===true){oSettings.aoData[iAODataIndex]=null
}return aData};this.fnClearTable=function(bRedraw){var oSettings=_fnSettingsFromNode(this[_oExt.iApiIndex]);
_fnClearTable(oSettings);if(typeof bRedraw=="undefined"||bRedraw){_fnDraw(oSettings)
}};this.fnOpen=function(nTr,sHtml,sClass){var oSettings=_fnSettingsFromNode(this[_oExt.iApiIndex]);
this.fnClose(nTr);var nNewRow=document.createElement("tr");var nNewCell=document.createElement("td");
nNewRow.appendChild(nNewCell);nNewCell.className=sClass;nNewCell.colSpan=_fnVisbleColumns(oSettings);
nNewCell.innerHTML=sHtml;var nTrs=$("tbody tr",oSettings.nTable);if($.inArray(nTr,nTrs)!=-1){$(nNewRow).insertAfter(nTr)
}if(!oSettings.oFeatures.bServerSide){oSettings.aoOpenRows.push({nTr:nNewRow,nParent:nTr})
}return nNewRow};this.fnClose=function(nTr){var oSettings=_fnSettingsFromNode(this[_oExt.iApiIndex]);
for(var i=0;i<oSettings.aoOpenRows.length;i++){if(oSettings.aoOpenRows[i].nParent==nTr){var nTrParent=oSettings.aoOpenRows[i].nTr.parentNode;
if(nTrParent){nTrParent.removeChild(oSettings.aoOpenRows[i].nTr)}oSettings.aoOpenRows.splice(i,1);
return 0}}return 1};this.fnGetData=function(mRow){var oSettings=_fnSettingsFromNode(this[_oExt.iApiIndex]);
if(typeof mRow!="undefined"){var iRow=(typeof mRow=="object")?_fnNodeToDataIndex(oSettings,mRow):mRow;
return oSettings.aoData[iRow]._aData}return _fnGetDataMaster(oSettings)};this.fnGetNodes=function(iRow){var oSettings=_fnSettingsFromNode(this[_oExt.iApiIndex]);
if(typeof iRow!="undefined"){return oSettings.aoData[iRow].nTr}return _fnGetTrNodes(oSettings)
};this.fnGetPosition=function(nNode){var oSettings=_fnSettingsFromNode(this[_oExt.iApiIndex]);
var i;if(nNode.nodeName=="TR"){return _fnNodeToDataIndex(oSettings,nNode)}else{if(nNode.nodeName=="TD"){var iDataIndex=_fnNodeToDataIndex(oSettings,nNode.parentNode);
var iCorrector=0;for(var j=0;j<oSettings.aoColumns.length;j++){if(oSettings.aoColumns[j].bVisible){if(oSettings.aoData[iDataIndex].nTr.getElementsByTagName("td")[j-iCorrector]==nNode){return[iDataIndex,j-iCorrector,j]
}}else{iCorrector++}}}}return null};this.fnUpdate=function(mData,mRow,iColumn,bRedraw){var oSettings=_fnSettingsFromNode(this[_oExt.iApiIndex]);
var iVisibleColumn;var sDisplay;var iRow=(typeof mRow=="object")?_fnNodeToDataIndex(oSettings,mRow):mRow;
if(typeof mData!="object"){sDisplay=mData;oSettings.aoData[iRow]._aData[iColumn]=sDisplay;
if(oSettings.aoColumns[iColumn].fnRender!==null){sDisplay=oSettings.aoColumns[iColumn].fnRender({iDataRow:iRow,iDataColumn:iColumn,aData:oSettings.aoData[iRow]._aData,oSettings:oSettings});
if(oSettings.aoColumns[iColumn].bUseRendered){oSettings.aoData[iRow]._aData[iColumn]=sDisplay
}}iVisibleColumn=_fnColumnIndexToVisible(oSettings,iColumn);if(iVisibleColumn!==null){oSettings.aoData[iRow].nTr.getElementsByTagName("td")[iVisibleColumn].innerHTML=sDisplay
}}else{if(mData.length!=oSettings.aoColumns.length){alert("DataTables warning: An array passed to fnUpdate must have the same number of columns as the table in question - in this case "+oSettings.aoColumns.length);
return 1}for(var i=0;i<mData.length;i++){sDisplay=mData[i];oSettings.aoData[iRow]._aData[i]=sDisplay;
if(oSettings.aoColumns[i].fnRender!==null){sDisplay=oSettings.aoColumns[i].fnRender({iDataRow:iRow,iDataColumn:i,aData:oSettings.aoData[iRow]._aData,oSettings:oSettings});
if(oSettings.aoColumns[i].bUseRendered){oSettings.aoData[iRow]._aData[i]=sDisplay
}}iVisibleColumn=_fnColumnIndexToVisible(oSettings,i);if(iVisibleColumn!==null){oSettings.aoData[iRow].nTr.getElementsByTagName("td")[iVisibleColumn].innerHTML=sDisplay
}}}_fnBuildSearchArray(oSettings,1);if(typeof bRedraw!="undefined"&&bRedraw){_fnReDraw(oSettings)
}return 0};this.fnSetColumnVis=function(iCol,bShow){var oSettings=_fnSettingsFromNode(this[_oExt.iApiIndex]);
var i,iLen;var iColumns=oSettings.aoColumns.length;var nTd,anTds;if(oSettings.aoColumns[iCol].bVisible==bShow){return
}var nTrHead=$("thead:eq(0)>tr",oSettings.nTable)[0];var nTrFoot=$("tfoot:eq(0)>tr",oSettings.nTable)[0];
var anTheadTh=[];var anTfootTh=[];for(i=0;i<iColumns;i++){anTheadTh.push(oSettings.aoColumns[i].nTh);
anTfootTh.push(oSettings.aoColumns[i].nTf)}if(bShow){var iInsert=0;for(i=0;i<iCol;
i++){if(oSettings.aoColumns[i].bVisible){iInsert++}}if(iInsert>=_fnVisbleColumns(oSettings)){nTrHead.appendChild(anTheadTh[iCol]);
if(nTrFoot){nTrFoot.appendChild(anTfootTh[iCol])}for(i=0,iLen=oSettings.aoData.length;
i<iLen;i++){nTd=oSettings.aoData[i]._anHidden[iCol];oSettings.aoData[i].nTr.appendChild(nTd)
}}else{var iBefore;for(i=iCol;i<iColumns;i++){iBefore=_fnColumnIndexToVisible(oSettings,i);
if(iBefore!==null){break}}nTrHead.insertBefore(anTheadTh[iCol],nTrHead.getElementsByTagName("th")[iBefore]);
if(nTrFoot){nTrFoot.insertBefore(anTfootTh[iCol],nTrFoot.getElementsByTagName("th")[iBefore])
}anTds=_fnGetTdNodes(oSettings);for(i=0,iLen=oSettings.aoData.length;i<iLen;i++){nTd=oSettings.aoData[i]._anHidden[iCol];
oSettings.aoData[i].nTr.insertBefore(nTd,$(">td:eq("+iBefore+")",oSettings.aoData[i].nTr)[0])
}}oSettings.aoColumns[iCol].bVisible=true}else{nTrHead.removeChild(anTheadTh[iCol]);
if(nTrFoot){nTrFoot.removeChild(anTfootTh[iCol])}anTds=_fnGetTdNodes(oSettings);for(i=0,iLen=oSettings.aoData.length;
i<iLen;i++){nTd=anTds[(i*oSettings.aoColumns.length)+iCol];oSettings.aoData[i]._anHidden[iCol]=nTd;
nTd.parentNode.removeChild(nTd)}oSettings.aoColumns[iCol].bVisible=false}for(i=0,iLen=oSettings.aoOpenRows.length;
i<iLen;i++){oSettings.aoOpenRows[i].nTr.colSpan=_fnVisbleColumns(oSettings)}_fnSaveState(oSettings)
};this.fnPageChange=function(sAction,bRedraw){var oSettings=_fnSettingsFromNode(this[_oExt.iApiIndex]);
_fnPageChange(oSettings,sAction);_fnCalculateEnd(oSettings);if(typeof bRedraw=="undefined"||bRedraw){_fnDraw(oSettings)
}};function _fnExternApiFunc(sFunc){return function(){var aArgs=[_fnSettingsFromNode(this[_oExt.iApiIndex])].concat(Array.prototype.slice.call(arguments));
return _oExt.oApi[sFunc].apply(this,aArgs)}}for(var sFunc in _oExt.oApi){if(sFunc){this[sFunc]=_fnExternApiFunc(sFunc)
}}function _fnInitalise(oSettings){if(oSettings.bInitialised===false){setTimeout(function(){_fnInitalise(oSettings)
},200);return}_fnAddOptionsHtml(oSettings);_fnDrawHead(oSettings);if(oSettings.oFeatures.bSort){_fnSort(oSettings,false);
_fnSortingClasses(oSettings)}else{oSettings.aiDisplay=oSettings.aiDisplayMaster.slice();
_fnCalculateEnd(oSettings);_fnDraw(oSettings)}if(oSettings.sAjaxSource!==null&&!oSettings.oFeatures.bServerSide){_fnProcessingDisplay(oSettings,true);
oSettings.fnServerData(oSettings.sAjaxSource,null,function(json){for(var i=0;i<json.aaData.length;
i++){_fnAddData(oSettings,json.aaData[i])}oSettings.iInitDisplayStart=oSettings._iDisplayStart;
if(oSettings.oFeatures.bSort){_fnSort(oSettings)}else{oSettings.aiDisplay=oSettings.aiDisplayMaster.slice();
_fnCalculateEnd(oSettings);_fnDraw(oSettings)}_fnProcessingDisplay(oSettings,false);
if(typeof oSettings.fnInitComplete=="function"){oSettings.fnInitComplete(oSettings,json)
}});return}if(typeof oSettings.fnInitComplete=="function"){oSettings.fnInitComplete(oSettings)
}if(!oSettings.oFeatures.bServerSide){_fnProcessingDisplay(oSettings,false)}}function _fnLanguageProcess(oSettings,oLanguage,bInit){_fnMap(oSettings.oLanguage,oLanguage,"sProcessing");
_fnMap(oSettings.oLanguage,oLanguage,"sLengthMenu");_fnMap(oSettings.oLanguage,oLanguage,"sZeroRecords");
_fnMap(oSettings.oLanguage,oLanguage,"sInfo");_fnMap(oSettings.oLanguage,oLanguage,"sInfoEmpty");
_fnMap(oSettings.oLanguage,oLanguage,"sInfoFiltered");_fnMap(oSettings.oLanguage,oLanguage,"sInfoPostFix");
_fnMap(oSettings.oLanguage,oLanguage,"sSearch");if(typeof oLanguage.oPaginate!="undefined"){_fnMap(oSettings.oLanguage.oPaginate,oLanguage.oPaginate,"sFirst");
_fnMap(oSettings.oLanguage.oPaginate,oLanguage.oPaginate,"sPrevious");_fnMap(oSettings.oLanguage.oPaginate,oLanguage.oPaginate,"sNext");
_fnMap(oSettings.oLanguage.oPaginate,oLanguage.oPaginate,"sLast")}if(bInit){_fnInitalise(oSettings)
}}function _fnAddColumn(oSettings,oOptions,nTh){oSettings.aoColumns[oSettings.aoColumns.length++]={sType:null,_bAutoType:true,bVisible:true,bSearchable:true,bSortable:true,asSorting:["asc","desc"],sSortingClass:oSettings.oClasses.sSortable,sSortingClassJUI:oSettings.oClasses.sSortJUI,sTitle:nTh?nTh.innerHTML:"",sName:"",sWidth:null,sClass:null,fnRender:null,bUseRendered:true,iDataSort:oSettings.aoColumns.length-1,sSortDataType:"std",nTh:nTh?nTh:document.createElement("th"),nTf:null};
var iLength=oSettings.aoColumns.length-1;var oCol=oSettings.aoColumns[iLength];if(typeof oOptions!="undefined"&&oOptions!==null){if(typeof oOptions.sType!="undefined"){oCol.sType=oOptions.sType;
oCol._bAutoType=false}_fnMap(oCol,oOptions,"bVisible");_fnMap(oCol,oOptions,"bSearchable");
_fnMap(oCol,oOptions,"bSortable");_fnMap(oCol,oOptions,"sTitle");_fnMap(oCol,oOptions,"sName");
_fnMap(oCol,oOptions,"sWidth");_fnMap(oCol,oOptions,"sClass");_fnMap(oCol,oOptions,"fnRender");
_fnMap(oCol,oOptions,"bUseRendered");_fnMap(oCol,oOptions,"iDataSort");_fnMap(oCol,oOptions,"asSorting");
_fnMap(oCol,oOptions,"sSortDataType")}if(!oSettings.oFeatures.bSort){oCol.bSortable=false
}if(!oCol.bSortable||($.inArray("asc",oCol.asSorting)==-1&&$.inArray("desc",oCol.asSorting)==-1)){oCol.sSortingClass=oSettings.oClasses.sSortableNone;
oCol.sSortingClassJUI=""}else{if($.inArray("asc",oCol.asSorting)!=-1&&$.inArray("desc",oCol.asSorting)==-1){oCol.sSortingClass=oSettings.oClasses.sSortableAsc;
oCol.sSortingClassJUI=oSettings.oClasses.sSortJUIAscAllowed}else{if($.inArray("asc",oCol.asSorting)==-1&&$.inArray("desc",oCol.asSorting)!=-1){oCol.sSortingClass=oSettings.oClasses.sSortableDesc;
oCol.sSortingClassJUI=oSettings.oClasses.sSortJUIDescAllowed}}}if(typeof oSettings.aoPreSearchCols[iLength]=="undefined"||oSettings.aoPreSearchCols[iLength]===null){oSettings.aoPreSearchCols[iLength]={sSearch:"",bEscapeRegex:true}
}else{if(typeof oSettings.aoPreSearchCols[iLength].bEscapeRegex=="undefined"){oSettings.aoPreSearchCols[iLength].bEscapeRegex=true
}}}function _fnAddData(oSettings,aData){if(aData.length!=oSettings.aoColumns.length){alert("DataTables warning: Added data does not match known number of columns");
return -1}var iThisIndex=oSettings.aoData.length;oSettings.aoData.push({nTr:document.createElement("tr"),_iId:oSettings.iNextId++,_aData:aData.slice(),_anHidden:[],_sRowStripe:""});
var nTd,sThisType;for(var i=0;i<aData.length;i++){nTd=document.createElement("td");
if(typeof oSettings.aoColumns[i].fnRender=="function"){var sRendered=oSettings.aoColumns[i].fnRender({iDataRow:iThisIndex,iDataColumn:i,aData:aData,oSettings:oSettings});
nTd.innerHTML=sRendered;if(oSettings.aoColumns[i].bUseRendered){oSettings.aoData[iThisIndex]._aData[i]=sRendered
}}else{nTd.innerHTML=aData[i]}if(oSettings.aoColumns[i].sClass!==null){nTd.className=oSettings.aoColumns[i].sClass
}if(oSettings.aoColumns[i]._bAutoType&&oSettings.aoColumns[i].sType!="string"){sThisType=_fnDetectType(oSettings.aoData[iThisIndex]._aData[i]);
if(oSettings.aoColumns[i].sType===null){oSettings.aoColumns[i].sType=sThisType}else{if(oSettings.aoColumns[i].sType!=sThisType){oSettings.aoColumns[i].sType="string"
}}}if(oSettings.aoColumns[i].bVisible){oSettings.aoData[iThisIndex].nTr.appendChild(nTd)
}else{oSettings.aoData[iThisIndex]._anHidden[i]=nTd}}oSettings.aiDisplayMaster.push(iThisIndex);
return iThisIndex}function _fnGatherData(oSettings){var iLoop,i,iLen,j,jLen,jInner,nTds,nTrs,nTd,aLocalData,iThisIndex,iRow,iRows,iColumn,iColumns;
if(oSettings.sAjaxSource===null){nTrs=oSettings.nTable.getElementsByTagName("tbody")[0].childNodes;
for(i=0,iLen=nTrs.length;i<iLen;i++){if(nTrs[i].nodeName=="TR"){iThisIndex=oSettings.aoData.length;
oSettings.aoData.push({nTr:nTrs[i],_iId:oSettings.iNextId++,_aData:[],_anHidden:[],_sRowStripe:""});
oSettings.aiDisplayMaster.push(iThisIndex);aLocalData=oSettings.aoData[iThisIndex]._aData;
nTds=nTrs[i].childNodes;jInner=0;for(j=0,jLen=nTds.length;j<jLen;j++){if(nTds[j].nodeName=="TD"){aLocalData[jInner]=nTds[j].innerHTML;
jInner++}}}}}nTrs=_fnGetTrNodes(oSettings);nTds=[];for(i=0,iLen=nTrs.length;i<iLen;
i++){for(j=0,jLen=nTrs[i].childNodes.length;j<jLen;j++){nTd=nTrs[i].childNodes[j];
if(nTd.nodeName=="TD"){nTds.push(nTd)}}}if(nTds.length!=nTrs.length*oSettings.aoColumns.length){alert("DataTables warning: Unexpected number of TD elements. Expected "+(nTrs.length*oSettings.aoColumns.length)+" and got "+nTds.length+". DataTables does not support rowspan / colspan in the table body, and there must be one cell for each row/column combination.")
}for(iColumn=0,iColumns=oSettings.aoColumns.length;iColumn<iColumns;iColumn++){if(oSettings.aoColumns[iColumn].sTitle===null){oSettings.aoColumns[iColumn].sTitle=oSettings.aoColumns[iColumn].nTh.innerHTML
}var bAutoType=oSettings.aoColumns[iColumn]._bAutoType,bRender=typeof oSettings.aoColumns[iColumn].fnRender=="function",bClass=oSettings.aoColumns[iColumn].sClass!==null,bVisible=oSettings.aoColumns[iColumn].bVisible,nCell,sThisType,sRendered;
if(bAutoType||bRender||bClass||!bVisible){for(iRow=0,iRows=oSettings.aoData.length;
iRow<iRows;iRow++){nCell=nTds[(iRow*iColumns)+iColumn];if(bAutoType){if(oSettings.aoColumns[iColumn].sType!="string"){sThisType=_fnDetectType(oSettings.aoData[iRow]._aData[iColumn]);
if(oSettings.aoColumns[iColumn].sType===null){oSettings.aoColumns[iColumn].sType=sThisType
}else{if(oSettings.aoColumns[iColumn].sType!=sThisType){oSettings.aoColumns[iColumn].sType="string"
}}}}if(bRender){sRendered=oSettings.aoColumns[iColumn].fnRender({iDataRow:iRow,iDataColumn:iColumn,aData:oSettings.aoData[iRow]._aData,oSettings:oSettings});
nCell.innerHTML=sRendered;if(oSettings.aoColumns[iColumn].bUseRendered){oSettings.aoData[iRow]._aData[iColumn]=sRendered
}}if(bClass){nCell.className+=" "+oSettings.aoColumns[iColumn].sClass}if(!bVisible){oSettings.aoData[iRow]._anHidden[iColumn]=nCell;
nCell.parentNode.removeChild(nCell)}}}}}function _fnDrawHead(oSettings){var i,nTh,iLen;
var iThs=oSettings.nTable.getElementsByTagName("thead")[0].getElementsByTagName("th").length;
var iCorrector=0;if(iThs!==0){for(i=0,iLen=oSettings.aoColumns.length;i<iLen;i++){nTh=oSettings.aoColumns[i].nTh;
if(oSettings.aoColumns[i].bVisible){if(oSettings.aoColumns[i].sWidth!==null){nTh.style.width=oSettings.aoColumns[i].sWidth
}if(oSettings.aoColumns[i].sTitle!=nTh.innerHTML){nTh.innerHTML=oSettings.aoColumns[i].sTitle
}}else{nTh.parentNode.removeChild(nTh);iCorrector++}}}else{var nTr=document.createElement("tr");
for(i=0,iLen=oSettings.aoColumns.length;i<iLen;i++){nTh=oSettings.aoColumns[i].nTh;
nTh.innerHTML=oSettings.aoColumns[i].sTitle;if(oSettings.aoColumns[i].bVisible){if(oSettings.aoColumns[i].sClass!==null){nTh.className=oSettings.aoColumns[i].sClass
}if(oSettings.aoColumns[i].sWidth!==null){nTh.style.width=oSettings.aoColumns[i].sWidth
}nTr.appendChild(nTh)}}$("thead:eq(0)",oSettings.nTable).html("")[0].appendChild(nTr)
}if(oSettings.bJUI){for(i=0,iLen=oSettings.aoColumns.length;i<iLen;i++){oSettings.aoColumns[i].nTh.insertBefore(document.createElement("span"),oSettings.aoColumns[i].nTh.firstChild)
}}if(oSettings.oFeatures.bSort){for(i=0;i<oSettings.aoColumns.length;i++){if(oSettings.aoColumns[i].bSortable!==false){_fnSortAttachListener(oSettings,oSettings.aoColumns[i].nTh,i)
}else{$(oSettings.aoColumns[i].nTh).addClass(oSettings.oClasses.sSortableNone)}}$("thead:eq(0) th",oSettings.nTable).mousedown(function(e){if(e.shiftKey){this.onselectstart=function(){return false
};return false}})}var nTfoot=oSettings.nTable.getElementsByTagName("tfoot");if(nTfoot.length!==0){iCorrector=0;
var nTfs=nTfoot[0].getElementsByTagName("th");for(i=0,iLen=nTfs.length;i<iLen;i++){oSettings.aoColumns[i].nTf=nTfs[i-iCorrector];
if(!oSettings.aoColumns[i].bVisible){nTfs[i-iCorrector].parentNode.removeChild(nTfs[i-iCorrector]);
iCorrector++}}}}function _fnDraw(oSettings){var i,iLen;var anRows=[];var iRowCount=0;
var bRowError=false;var iStrips=oSettings.asStripClasses.length;var iOpenRows=oSettings.aoOpenRows.length;
if(oSettings.oFeatures.bServerSide&&!_fnAjaxUpdate(oSettings)){return}if(typeof oSettings.iInitDisplayStart!="undefined"&&oSettings.iInitDisplayStart!=-1){oSettings._iDisplayStart=(oSettings.iInitDisplayStart>=oSettings.fnRecordsDisplay())?0:oSettings.iInitDisplayStart;
oSettings.iInitDisplayStart=-1;_fnCalculateEnd(oSettings)}if(oSettings.aiDisplay.length!==0){var iStart=oSettings._iDisplayStart;
var iEnd=oSettings._iDisplayEnd;if(oSettings.oFeatures.bServerSide){iStart=0;iEnd=oSettings.aoData.length
}for(var j=iStart;j<iEnd;j++){var aoData=oSettings.aoData[oSettings.aiDisplay[j]];
var nRow=aoData.nTr;if(iStrips!==0){var sStrip=oSettings.asStripClasses[iRowCount%iStrips];
if(aoData._sRowStripe!=sStrip){$(nRow).removeClass(aoData._sRowStripe).addClass(sStrip);
aoData._sRowStripe=sStrip}}if(typeof oSettings.fnRowCallback=="function"){nRow=oSettings.fnRowCallback(nRow,oSettings.aoData[oSettings.aiDisplay[j]]._aData,iRowCount,j);
if(!nRow&&!bRowError){alert("DataTables warning: A node was not returned by fnRowCallback");
bRowError=true}}anRows.push(nRow);iRowCount++;if(iOpenRows!==0){for(var k=0;k<iOpenRows;
k++){if(nRow==oSettings.aoOpenRows[k].nParent){anRows.push(oSettings.aoOpenRows[k].nTr)
}}}}}else{anRows[0]=document.createElement("tr");if(typeof oSettings.asStripClasses[0]!="undefined"){anRows[0].className=oSettings.asStripClasses[0]
}var nTd=document.createElement("td");nTd.setAttribute("valign","top");nTd.colSpan=oSettings.aoColumns.length;
nTd.className=oSettings.oClasses.sRowEmpty;nTd.innerHTML=oSettings.oLanguage.sZeroRecords;
anRows[iRowCount].appendChild(nTd)}if(typeof oSettings.fnHeaderCallback=="function"){oSettings.fnHeaderCallback($("thead:eq(0)>tr",oSettings.nTable)[0],_fnGetDataMaster(oSettings),oSettings._iDisplayStart,oSettings.fnDisplayEnd(),oSettings.aiDisplay)
}if(typeof oSettings.fnFooterCallback=="function"){oSettings.fnFooterCallback($("tfoot:eq(0)>tr",oSettings.nTable)[0],_fnGetDataMaster(oSettings),oSettings._iDisplayStart,oSettings.fnDisplayEnd(),oSettings.aiDisplay)
}var nBody=oSettings.nTable.getElementsByTagName("tbody");if(nBody[0]){var nTrs=nBody[0].childNodes;
for(i=nTrs.length-1;i>=0;i--){nTrs[i].parentNode.removeChild(nTrs[i])}for(i=0,iLen=anRows.length;
i<iLen;i++){nBody[0].appendChild(anRows[i])}}for(i=0,iLen=oSettings.aoDrawCallback.length;
i<iLen;i++){oSettings.aoDrawCallback[i].fn(oSettings)}oSettings.bSorted=false;oSettings.bFiltered=false;
if(typeof oSettings._bInitComplete=="undefined"){oSettings._bInitComplete=true;if(oSettings.oFeatures.bAutoWidth&&oSettings.nTable.offsetWidth!==0){oSettings.nTable.style.width=oSettings.nTable.offsetWidth+"px"
}}}function _fnReDraw(oSettings){if(oSettings.oFeatures.bSort){_fnSort(oSettings,oSettings.oPreviousSearch)
}else{if(oSettings.oFeatures.bFilter){_fnFilterComplete(oSettings,oSettings.oPreviousSearch)
}else{_fnCalculateEnd(oSettings);_fnDraw(oSettings)}}}function _fnAjaxUpdate(oSettings){if(oSettings.bAjaxDataGet){_fnProcessingDisplay(oSettings,true);
var iColumns=oSettings.aoColumns.length;var aoData=[];var i;oSettings.iServerDraw++;
aoData.push({name:"sEcho",value:oSettings.iServerDraw});aoData.push({name:"iColumns",value:iColumns});
aoData.push({name:"sColumns",value:_fnColumnOrdering(oSettings)});aoData.push({name:"iDisplayStart",value:oSettings._iDisplayStart});
aoData.push({name:"iDisplayLength",value:oSettings.oFeatures.bPaginate!==false?oSettings._iDisplayLength:-1});
if(oSettings.oFeatures.bFilter!==false){aoData.push({name:"sSearch",value:oSettings.oPreviousSearch.sSearch});
aoData.push({name:"bEscapeRegex",value:oSettings.oPreviousSearch.bEscapeRegex});for(i=0;
i<iColumns;i++){aoData.push({name:"sSearch_"+i,value:oSettings.aoPreSearchCols[i].sSearch});
aoData.push({name:"bEscapeRegex_"+i,value:oSettings.aoPreSearchCols[i].bEscapeRegex});
aoData.push({name:"bSearchable_"+i,value:oSettings.aoColumns[i].bSearchable})}}if(oSettings.oFeatures.bSort!==false){var iFixed=oSettings.aaSortingFixed!==null?oSettings.aaSortingFixed.length:0;
var iUser=oSettings.aaSorting.length;aoData.push({name:"iSortingCols",value:iFixed+iUser});
for(i=0;i<iFixed;i++){aoData.push({name:"iSortCol_"+i,value:oSettings.aaSortingFixed[i][0]});
aoData.push({name:"sSortDir_"+i,value:oSettings.aaSortingFixed[i][1]})}for(i=0;i<iUser;
i++){aoData.push({name:"iSortCol_"+(i+iFixed),value:oSettings.aaSorting[i][0]});aoData.push({name:"sSortDir_"+(i+iFixed),value:oSettings.aaSorting[i][1]})
}for(i=0;i<iColumns;i++){aoData.push({name:"bSortable_"+i,value:oSettings.aoColumns[i].bSortable})
}}oSettings.fnServerData(oSettings.sAjaxSource,aoData,function(json){_fnAjaxUpdateDraw(oSettings,json)
});return false}else{return true}}function _fnAjaxUpdateDraw(oSettings,json){if(typeof json.sEcho!="undefined"){if(json.sEcho*1<oSettings.iServerDraw){return
}else{oSettings.iServerDraw=json.sEcho*1}}_fnClearTable(oSettings);oSettings._iRecordsTotal=json.iTotalRecords;
oSettings._iRecordsDisplay=json.iTotalDisplayRecords;var sOrdering=_fnColumnOrdering(oSettings);
var bReOrder=(typeof json.sColumns!="undefined"&&sOrdering!==""&&json.sColumns!=sOrdering);
if(bReOrder){var aiIndex=_fnReOrderIndex(oSettings,json.sColumns)}for(var i=0,iLen=json.aaData.length;
i<iLen;i++){if(bReOrder){var aData=[];for(var j=0,jLen=oSettings.aoColumns.length;
j<jLen;j++){aData.push(json.aaData[i][aiIndex[j]])}_fnAddData(oSettings,aData)}else{_fnAddData(oSettings,json.aaData[i])
}}oSettings.aiDisplay=oSettings.aiDisplayMaster.slice();oSettings.bAjaxDataGet=false;
_fnDraw(oSettings);oSettings.bAjaxDataGet=true;_fnProcessingDisplay(oSettings,false)
}function _fnAddOptionsHtml(oSettings){var nHolding=document.createElement("div");
oSettings.nTable.parentNode.insertBefore(nHolding,oSettings.nTable);var nWrapper=document.createElement("div");
nWrapper.className=oSettings.oClasses.sWrapper;if(oSettings.sTableId!==""){nWrapper.setAttribute("id",oSettings.sTableId+"_wrapper")
}var nInsertNode=nWrapper;var sDom=oSettings.sDom.replace("H","fg-toolbar ui-widget-header ui-corner-tl ui-corner-tr ui-helper-clearfix");
sDom=sDom.replace("F","fg-toolbar ui-widget-header ui-corner-bl ui-corner-br ui-helper-clearfix");
var aDom=sDom.split("");var nTmp,iPushFeature,cOption,nNewNode,cNext,sClass,j;for(var i=0;
i<aDom.length;i++){iPushFeature=0;cOption=aDom[i];if(cOption=="<"){nNewNode=document.createElement("div");
cNext=aDom[i+1];if(cNext=="'"||cNext=='"'){sClass="";j=2;while(aDom[i+j]!=cNext){sClass+=aDom[i+j];
j++}nNewNode.className=sClass;i+=j}nInsertNode.appendChild(nNewNode);nInsertNode=nNewNode
}else{if(cOption==">"){nInsertNode=nInsertNode.parentNode}else{if(cOption=="l"&&oSettings.oFeatures.bPaginate&&oSettings.oFeatures.bLengthChange){nTmp=_fnFeatureHtmlLength(oSettings);
iPushFeature=1}else{if(cOption=="f"&&oSettings.oFeatures.bFilter){nTmp=_fnFeatureHtmlFilter(oSettings);
iPushFeature=1}else{if(cOption=="r"&&oSettings.oFeatures.bProcessing){nTmp=_fnFeatureHtmlProcessing(oSettings);
iPushFeature=1}else{if(cOption=="t"){nTmp=oSettings.nTable;iPushFeature=1}else{if(cOption=="i"&&oSettings.oFeatures.bInfo){nTmp=_fnFeatureHtmlInfo(oSettings);
iPushFeature=1}else{if(cOption=="p"&&oSettings.oFeatures.bPaginate){nTmp=_fnFeatureHtmlPaginate(oSettings);
iPushFeature=1}else{if(_oExt.aoFeatures.length!==0){var aoFeatures=_oExt.aoFeatures;
for(var k=0,kLen=aoFeatures.length;k<kLen;k++){if(cOption==aoFeatures[k].cFeature){nTmp=aoFeatures[k].fnInit(oSettings);
if(nTmp){iPushFeature=1}break}}}}}}}}}}}if(iPushFeature==1){if(typeof oSettings.aanFeatures[cOption]!="object"){oSettings.aanFeatures[cOption]=[]
}oSettings.aanFeatures[cOption].push(nTmp);nInsertNode.appendChild(nTmp)}}nHolding.parentNode.replaceChild(nWrapper,nHolding)
}function _fnFeatureHtmlFilter(oSettings){var nFilter=document.createElement("div");
if(oSettings.sTableId!==""&&typeof oSettings.aanFeatures.f=="undefined"){nFilter.setAttribute("id",oSettings.sTableId+"_filter")
}nFilter.className=oSettings.oClasses.sFilter;var sSpace=oSettings.oLanguage.sSearch===""?"":" ";
nFilter.innerHTML=oSettings.oLanguage.sSearch+sSpace+'<input type="text" />';var jqFilter=$("input",nFilter);
jqFilter.val(oSettings.oPreviousSearch.sSearch.replace('"',"&quot;"));jqFilter.keyup(function(e){var n=oSettings.aanFeatures.f;
for(var i=0,iLen=n.length;i<iLen;i++){if(n[i]!=this.parentNode){$("input",n[i]).val(this.value)
}}_fnFilterComplete(oSettings,{sSearch:this.value,bEscapeRegex:oSettings.oPreviousSearch.bEscapeRegex})
});jqFilter.keypress(function(e){if(e.keyCode==13){return false}});return nFilter
}function _fnFilterComplete(oSettings,oInput,iForce){_fnFilter(oSettings,oInput.sSearch,iForce,oInput.bEscapeRegex);
for(var i=0;i<oSettings.aoPreSearchCols.length;i++){_fnFilterColumn(oSettings,oSettings.aoPreSearchCols[i].sSearch,i,oSettings.aoPreSearchCols[i].bEscapeRegex)
}if(_oExt.afnFiltering.length!==0){_fnFilterCustom(oSettings)}oSettings.bFiltered=true;
oSettings._iDisplayStart=0;_fnCalculateEnd(oSettings);_fnDraw(oSettings);_fnBuildSearchArray(oSettings,0)
}function _fnFilterCustom(oSettings){var afnFilters=_oExt.afnFiltering;for(var i=0,iLen=afnFilters.length;
i<iLen;i++){var iCorrector=0;for(var j=0,jLen=oSettings.aiDisplay.length;j<jLen;j++){var iDisIndex=oSettings.aiDisplay[j-iCorrector];
if(!afnFilters[i](oSettings,oSettings.aoData[iDisIndex]._aData,iDisIndex)){oSettings.aiDisplay.splice(j-iCorrector,1);
iCorrector++}}}}function _fnFilterColumn(oSettings,sInput,iColumn,bEscapeRegex){if(sInput===""){return
}var iIndexCorrector=0;var sRegexMatch=bEscapeRegex?_fnEscapeRegex(sInput):sInput;
var rpSearch=new RegExp(sRegexMatch,"i");for(var i=oSettings.aiDisplay.length-1;i>=0;
i--){var sData=_fnDataToSearch(oSettings.aoData[oSettings.aiDisplay[i]]._aData[iColumn],oSettings.aoColumns[iColumn].sType);
if(!rpSearch.test(sData)){oSettings.aiDisplay.splice(i,1);iIndexCorrector++}}}function _fnFilter(oSettings,sInput,iForce,bEscapeRegex){var i;
if(typeof iForce=="undefined"||iForce===null){iForce=0}if(_oExt.afnFiltering.length!==0){iForce=1
}var asSearch=bEscapeRegex?_fnEscapeRegex(sInput).split(" "):sInput.split(" ");var sRegExpString="^(?=.*?"+asSearch.join(")(?=.*?")+").*$";
var rpSearch=new RegExp(sRegExpString,"i");if(sInput.length<=0){oSettings.aiDisplay.splice(0,oSettings.aiDisplay.length);
oSettings.aiDisplay=oSettings.aiDisplayMaster.slice()}else{if(oSettings.aiDisplay.length==oSettings.aiDisplayMaster.length||oSettings.oPreviousSearch.sSearch.length>sInput.length||iForce==1||sInput.indexOf(oSettings.oPreviousSearch.sSearch)!==0){oSettings.aiDisplay.splice(0,oSettings.aiDisplay.length);
_fnBuildSearchArray(oSettings,1);for(i=0;i<oSettings.aiDisplayMaster.length;i++){if(rpSearch.test(oSettings.asDataSearch[i])){oSettings.aiDisplay.push(oSettings.aiDisplayMaster[i])
}}}else{var iIndexCorrector=0;for(i=0;i<oSettings.asDataSearch.length;i++){if(!rpSearch.test(oSettings.asDataSearch[i])){oSettings.aiDisplay.splice(i-iIndexCorrector,1);
iIndexCorrector++}}}}oSettings.oPreviousSearch.sSearch=sInput;oSettings.oPreviousSearch.bEscapeRegex=bEscapeRegex
}function _fnBuildSearchArray(oSettings,iMaster){oSettings.asDataSearch.splice(0,oSettings.asDataSearch.length);
var aArray=(typeof iMaster!="undefined"&&iMaster==1)?oSettings.aiDisplayMaster:oSettings.aiDisplay;
for(var i=0,iLen=aArray.length;i<iLen;i++){oSettings.asDataSearch[i]="";for(var j=0,jLen=oSettings.aoColumns.length;
j<jLen;j++){if(oSettings.aoColumns[j].bSearchable){var sData=oSettings.aoData[aArray[i]]._aData[j];
oSettings.asDataSearch[i]+=_fnDataToSearch(sData,oSettings.aoColumns[j].sType)+" "
}}}}function _fnDataToSearch(sData,sType){if(typeof _oExt.ofnSearch[sType]=="function"){return _oExt.ofnSearch[sType](sData)
}else{if(sType=="html"){return sData.replace(/\n/g," ").replace(/<.*?>/g,"")}else{if(typeof sData=="string"){return sData.replace(/\n/g," ")
}}}return sData}function _fnSort(oSettings,bApplyClasses){var aaSort=[];var oSort=_oExt.oSort;
var aoData=oSettings.aoData;var iDataSort;var iDataType;var i,j,jLen;if(!oSettings.oFeatures.bServerSide&&(oSettings.aaSorting.length!==0||oSettings.aaSortingFixed!==null)){if(oSettings.aaSortingFixed!==null){aaSort=oSettings.aaSortingFixed.concat(oSettings.aaSorting)
}else{aaSort=oSettings.aaSorting.slice()}for(i=0;i<aaSort.length;i++){var iColumn=aaSort[i][0];
var sDataType=oSettings.aoColumns[iColumn].sSortDataType;if(typeof _oExt.afnSortData[sDataType]!="undefined"){var iCorrector=0;
var aData=_oExt.afnSortData[sDataType](oSettings,iColumn);for(j=0,jLen=aoData.length;
j<jLen;j++){if(aoData[j]!==null){aoData[j]._aData[iColumn]=aData[iCorrector];iCorrector++
}}}}if(!window.runtime){var fnLocalSorting;var sDynamicSort="fnLocalSorting = function(a,b){var iTest;";
for(i=0;i<aaSort.length-1;i++){iDataSort=oSettings.aoColumns[aaSort[i][0]].iDataSort;
iDataType=oSettings.aoColumns[iDataSort].sType;sDynamicSort+="iTest = oSort['"+iDataType+"-"+aaSort[i][1]+"']( aoData[a]._aData["+iDataSort+"], aoData[b]._aData["+iDataSort+"] ); if ( iTest === 0 )"
}iDataSort=oSettings.aoColumns[aaSort[aaSort.length-1][0]].iDataSort;iDataType=oSettings.aoColumns[iDataSort].sType;
sDynamicSort+="iTest = oSort['"+iDataType+"-"+aaSort[aaSort.length-1][1]+"']( aoData[a]._aData["+iDataSort+"], aoData[b]._aData["+iDataSort+"] );if (iTest===0) return oSort['numeric-"+aaSort[aaSort.length-1][1]+"'](a, b); return iTest;}";
eval(sDynamicSort);oSettings.aiDisplayMaster.sort(fnLocalSorting)}else{var aAirSort=[];
var iLen=aaSort.length;for(i=0;i<iLen;i++){iDataSort=oSettings.aoColumns[aaSort[i][0]].iDataSort;
aAirSort.push([iDataSort,oSettings.aoColumns[iDataSort].sType+"-"+aaSort[i][1]])}oSettings.aiDisplayMaster.sort(function(a,b){var iTest;
for(var i=0;i<iLen;i++){iTest=oSort[aAirSort[i][1]](aoData[a]._aData[aAirSort[i][0]],aoData[b]._aData[aAirSort[i][0]]);
if(iTest!==0){return iTest}}return 0})}}if(typeof bApplyClasses=="undefined"||bApplyClasses){_fnSortingClasses(oSettings)
}oSettings.bSorted=true;if(oSettings.oFeatures.bFilter){_fnFilterComplete(oSettings,oSettings.oPreviousSearch,1)
}else{oSettings.aiDisplay=oSettings.aiDisplayMaster.slice();oSettings._iDisplayStart=0;
_fnCalculateEnd(oSettings);_fnDraw(oSettings)}}function _fnSortAttachListener(oSettings,nNode,iDataIndex,fnCallback){$(nNode).click(function(e){if(oSettings.aoColumns[iDataIndex].bSortable===false){return
}var fnInnerSorting=function(){var iColumn,iNextSort;if(e.shiftKey){var bFound=false;
for(var i=0;i<oSettings.aaSorting.length;i++){if(oSettings.aaSorting[i][0]==iDataIndex){bFound=true;
iColumn=oSettings.aaSorting[i][0];iNextSort=oSettings.aaSorting[i][2]+1;if(typeof oSettings.aoColumns[iColumn].asSorting[iNextSort]=="undefined"){oSettings.aaSorting.splice(i,1)
}else{oSettings.aaSorting[i][1]=oSettings.aoColumns[iColumn].asSorting[iNextSort];
oSettings.aaSorting[i][2]=iNextSort}break}}if(bFound===false){oSettings.aaSorting.push([iDataIndex,oSettings.aoColumns[iDataIndex].asSorting[0],0])
}}else{if(oSettings.aaSorting.length==1&&oSettings.aaSorting[0][0]==iDataIndex){iColumn=oSettings.aaSorting[0][0];
iNextSort=oSettings.aaSorting[0][2]+1;if(typeof oSettings.aoColumns[iColumn].asSorting[iNextSort]=="undefined"){iNextSort=0
}oSettings.aaSorting[0][1]=oSettings.aoColumns[iColumn].asSorting[iNextSort];oSettings.aaSorting[0][2]=iNextSort
}else{oSettings.aaSorting.splice(0,oSettings.aaSorting.length);oSettings.aaSorting.push([iDataIndex,oSettings.aoColumns[iDataIndex].asSorting[0],0])
}}_fnSort(oSettings)};if(!oSettings.oFeatures.bProcessing){fnInnerSorting()}else{_fnProcessingDisplay(oSettings,true);
setTimeout(function(){fnInnerSorting();if(!oSettings.oFeatures.bServerSide){_fnProcessingDisplay(oSettings,false)
}},0)}if(typeof fnCallback=="function"){fnCallback(oSettings)}})}function _fnSortingClasses(oSettings){var i,iLen,j,jLen,iFound;
var aaSort,sClass;var iColumns=oSettings.aoColumns.length;var oClasses=oSettings.oClasses;
for(i=0;i<iColumns;i++){if(oSettings.aoColumns[i].bSortable){$(oSettings.aoColumns[i].nTh).removeClass(oClasses.sSortAsc+" "+oClasses.sSortDesc+" "+oSettings.aoColumns[i].sSortingClass)
}}if(oSettings.aaSortingFixed!==null){aaSort=oSettings.aaSortingFixed.concat(oSettings.aaSorting)
}else{aaSort=oSettings.aaSorting.slice()}for(i=0;i<oSettings.aoColumns.length;i++){if(oSettings.aoColumns[i].bSortable){sClass=oSettings.aoColumns[i].sSortingClass;
iFound=-1;for(j=0;j<aaSort.length;j++){if(aaSort[j][0]==i){sClass=(aaSort[j][1]=="asc")?oClasses.sSortAsc:oClasses.sSortDesc;
iFound=j;break}}$(oSettings.aoColumns[i].nTh).addClass(sClass);if(oSettings.bJUI){var jqSpan=$("span",oSettings.aoColumns[i].nTh);
jqSpan.removeClass(oClasses.sSortJUIAsc+" "+oClasses.sSortJUIDesc+" "+oClasses.sSortJUI+" "+oClasses.sSortJUIAscAllowed+" "+oClasses.sSortJUIDescAllowed);
var sSpanClass;if(iFound==-1){sSpanClass=oSettings.aoColumns[i].sSortingClassJUI}else{if(aaSort[iFound][1]=="asc"){sSpanClass=oClasses.sSortJUIAsc
}else{sSpanClass=oClasses.sSortJUIDesc}}jqSpan.addClass(sSpanClass)}}else{$(oSettings.aoColumns[i].nTh).addClass(oSettings.aoColumns[i].sSortingClass)
}}sClass=oClasses.sSortColumn;if(oSettings.oFeatures.bSort&&oSettings.oFeatures.bSortClasses){var nTds=_fnGetTdNodes(oSettings);
if(nTds.length>=iColumns){for(i=0;i<iColumns;i++){if(nTds[i].className.indexOf(sClass+"1")!=-1){for(j=0,jLen=(nTds.length/iColumns);
j<jLen;j++){nTds[(iColumns*j)+i].className=nTds[(iColumns*j)+i].className.replace(" "+sClass+"1","")
}}else{if(nTds[i].className.indexOf(sClass+"2")!=-1){for(j=0,jLen=(nTds.length/iColumns);
j<jLen;j++){nTds[(iColumns*j)+i].className=nTds[(iColumns*j)+i].className.replace(" "+sClass+"2","")
}}else{if(nTds[i].className.indexOf(sClass+"3")!=-1){for(j=0,jLen=(nTds.length/iColumns);
j<jLen;j++){nTds[(iColumns*j)+i].className=nTds[(iColumns*j)+i].className.replace(" "+sClass+"3","")
}}}}}}var iClass=1,iTargetCol;for(i=0;i<aaSort.length;i++){iTargetCol=parseInt(aaSort[i][0],10);
for(j=0,jLen=(nTds.length/iColumns);j<jLen;j++){nTds[(iColumns*j)+iTargetCol].className+=" "+sClass+iClass
}if(iClass<3){iClass++}}}}function _fnFeatureHtmlPaginate(oSettings){var nPaginate=document.createElement("div");
nPaginate.className=oSettings.oClasses.sPaging+oSettings.sPaginationType;_oExt.oPagination[oSettings.sPaginationType].fnInit(oSettings,nPaginate,function(oSettings){_fnCalculateEnd(oSettings);
_fnDraw(oSettings)});if(typeof oSettings.aanFeatures.p=="undefined"){oSettings.aoDrawCallback.push({fn:function(oSettings){_oExt.oPagination[oSettings.sPaginationType].fnUpdate(oSettings,function(oSettings){_fnCalculateEnd(oSettings);
_fnDraw(oSettings)})},sName:"pagination"})}return nPaginate}function _fnPageChange(oSettings,sAction){var iOldStart=oSettings._iDisplayStart;
if(sAction=="first"){oSettings._iDisplayStart=0}else{if(sAction=="previous"){oSettings._iDisplayStart=oSettings._iDisplayLength>=0?oSettings._iDisplayStart-oSettings._iDisplayLength:0;
if(oSettings._iDisplayStart<0){oSettings._iDisplayStart=0}}else{if(sAction=="next"){if(oSettings._iDisplayLength>=0){if(oSettings._iDisplayStart+oSettings._iDisplayLength<oSettings.fnRecordsDisplay()){oSettings._iDisplayStart+=oSettings._iDisplayLength
}}else{oSettings._iDisplayStart=0}}else{if(sAction=="last"){if(oSettings._iDisplayLength>=0){var iPages=parseInt((oSettings.fnRecordsDisplay()-1)/oSettings._iDisplayLength,10)+1;
oSettings._iDisplayStart=(iPages-1)*oSettings._iDisplayLength}else{oSettings._iDisplayStart=0
}}else{alert("DataTables warning: unknown paging action: "+sAction)}}}}return iOldStart!=oSettings._iDisplayStart
}function _fnFeatureHtmlInfo(oSettings){var nInfo=document.createElement("div");nInfo.className=oSettings.oClasses.sInfo;
if(typeof oSettings.aanFeatures.i=="undefined"){oSettings.aoDrawCallback.push({fn:_fnUpdateInfo,sName:"information"});
if(oSettings.sTableId!==""){nInfo.setAttribute("id",oSettings.sTableId+"_info")}}return nInfo
}function _fnUpdateInfo(oSettings){if(!oSettings.oFeatures.bInfo||oSettings.aanFeatures.i.length===0){return
}var nFirst=oSettings.aanFeatures.i[0];if(oSettings.fnRecordsDisplay()===0&&oSettings.fnRecordsDisplay()==oSettings.fnRecordsTotal()){nFirst.innerHTML=oSettings.oLanguage.sInfoEmpty+oSettings.oLanguage.sInfoPostFix
}else{if(oSettings.fnRecordsDisplay()===0){nFirst.innerHTML=oSettings.oLanguage.sInfoEmpty+" "+oSettings.oLanguage.sInfoFiltered.replace("_MAX_",oSettings.fnRecordsTotal())+oSettings.oLanguage.sInfoPostFix
}else{if(oSettings.fnRecordsDisplay()==oSettings.fnRecordsTotal()){nFirst.innerHTML=oSettings.oLanguage.sInfo.replace("_START_",oSettings._iDisplayStart+1).replace("_END_",oSettings.fnDisplayEnd()).replace("_TOTAL_",oSettings.fnRecordsDisplay())+oSettings.oLanguage.sInfoPostFix
}else{nFirst.innerHTML=oSettings.oLanguage.sInfo.replace("_START_",oSettings._iDisplayStart+1).replace("_END_",oSettings.fnDisplayEnd()).replace("_TOTAL_",oSettings.fnRecordsDisplay())+" "+oSettings.oLanguage.sInfoFiltered.replace("_MAX_",oSettings.fnRecordsTotal())+oSettings.oLanguage.sInfoPostFix
}}}var n=oSettings.aanFeatures.i;if(n.length>1){var sInfo=nFirst.innerHTML;for(var i=1,iLen=n.length;
i<iLen;i++){n[i].innerHTML=sInfo}}}function _fnFeatureHtmlLength(oSettings){var sName=(oSettings.sTableId==="")?"":'name="'+oSettings.sTableId+'_length"';
var sStdMenu='<select size="1" '+sName+'><option value="10">10</option><option value="25">25</option><option value="50">50</option><option value="100">100</option></select>';
var nLength=document.createElement("div");if(oSettings.sTableId!==""&&typeof oSettings.aanFeatures.l=="undefined"){nLength.setAttribute("id",oSettings.sTableId+"_length")
}nLength.className=oSettings.oClasses.sLength;nLength.innerHTML=oSettings.oLanguage.sLengthMenu.replace("_MENU_",sStdMenu);
$('select option[value="'+oSettings._iDisplayLength+'"]',nLength).attr("selected",true);
$("select",nLength).change(function(e){var iVal=$(this).val();var n=oSettings.aanFeatures.l;
for(var i=0,iLen=n.length;i<iLen;i++){if(n[i]!=this.parentNode){$("select",n[i]).val(iVal)
}}oSettings._iDisplayLength=parseInt(iVal,10);_fnCalculateEnd(oSettings);if(oSettings._iDisplayEnd==oSettings.aiDisplay.length){oSettings._iDisplayStart=oSettings._iDisplayEnd-oSettings._iDisplayLength;
if(oSettings._iDisplayStart<0){oSettings._iDisplayStart=0}}if(oSettings._iDisplayLength==-1){oSettings._iDisplayStart=0
}_fnDraw(oSettings)});return nLength}function _fnFeatureHtmlProcessing(oSettings){var nProcessing=document.createElement("div");
if(oSettings.sTableId!==""&&typeof oSettings.aanFeatures.r=="undefined"){nProcessing.setAttribute("id",oSettings.sTableId+"_processing")
}nProcessing.innerHTML=oSettings.oLanguage.sProcessing;nProcessing.className=oSettings.oClasses.sProcessing;
oSettings.nTable.parentNode.insertBefore(nProcessing,oSettings.nTable);return nProcessing
}function _fnProcessingDisplay(oSettings,bShow){if(oSettings.oFeatures.bProcessing){var an=oSettings.aanFeatures.r;
for(var i=0,iLen=an.length;i<iLen;i++){an[i].style.visibility=bShow?"visible":"hidden"
}}}function _fnVisibleToColumnIndex(oSettings,iMatch){var iColumn=-1;for(var i=0;
i<oSettings.aoColumns.length;i++){if(oSettings.aoColumns[i].bVisible===true){iColumn++
}if(iColumn==iMatch){return i}}return null}function _fnColumnIndexToVisible(oSettings,iMatch){var iVisible=-1;
for(var i=0;i<oSettings.aoColumns.length;i++){if(oSettings.aoColumns[i].bVisible===true){iVisible++
}if(i==iMatch){return oSettings.aoColumns[i].bVisible===true?iVisible:null}}return null
}function _fnNodeToDataIndex(s,n){for(var i=0,iLen=s.aoData.length;i<iLen;i++){if(s.aoData[i]!==null&&s.aoData[i].nTr==n){return i
}}return null}function _fnVisbleColumns(oS){var iVis=0;for(var i=0;i<oS.aoColumns.length;
i++){if(oS.aoColumns[i].bVisible===true){iVis++}}return iVis}function _fnCalculateEnd(oSettings){if(oSettings.oFeatures.bPaginate===false){oSettings._iDisplayEnd=oSettings.aiDisplay.length
}else{if(oSettings._iDisplayStart+oSettings._iDisplayLength>oSettings.aiDisplay.length||oSettings._iDisplayLength==-1){oSettings._iDisplayEnd=oSettings.aiDisplay.length
}else{oSettings._iDisplayEnd=oSettings._iDisplayStart+oSettings._iDisplayLength}}}function _fnConvertToWidth(sWidth,nParent){if(!sWidth||sWidth===null||sWidth===""){return 0
}if(typeof nParent=="undefined"){nParent=document.getElementsByTagName("body")[0]
}var iWidth;var nTmp=document.createElement("div");nTmp.style.width=sWidth;nParent.appendChild(nTmp);
iWidth=nTmp.offsetWidth;nParent.removeChild(nTmp);return(iWidth)}function _fnCalculateColumnWidths(oSettings){var iTableWidth=oSettings.nTable.offsetWidth;
var iTotalUserIpSize=0;var iTmpWidth;var iVisibleColumns=0;var iColums=oSettings.aoColumns.length;
var i;var oHeaders=$("thead:eq(0)>th",oSettings.nTable);for(i=0;i<iColums;i++){if(oSettings.aoColumns[i].bVisible){iVisibleColumns++;
if(oSettings.aoColumns[i].sWidth!==null){iTmpWidth=_fnConvertToWidth(oSettings.aoColumns[i].sWidth,oSettings.nTable.parentNode);
iTotalUserIpSize+=iTmpWidth;oSettings.aoColumns[i].sWidth=iTmpWidth+"px"}}}if(iColums==oHeaders.length&&iTotalUserIpSize===0&&iVisibleColumns==iColums){for(i=0;
i<oSettings.aoColumns.length;i++){oSettings.aoColumns[i].sWidth=oHeaders[i].offsetWidth+"px"
}}else{var nCalcTmp=oSettings.nTable.cloneNode(false);nCalcTmp.setAttribute("id","");
var sTableTmp='<table class="'+nCalcTmp.className+'">';var sCalcHead="<tr>";var sCalcHtml="<tr>";
for(i=0;i<iColums;i++){if(oSettings.aoColumns[i].bVisible){sCalcHead+="<th>"+oSettings.aoColumns[i].sTitle+"</th>";
if(oSettings.aoColumns[i].sWidth!==null){var sWidth="";if(oSettings.aoColumns[i].sWidth!==null){sWidth=' style="width:'+oSettings.aoColumns[i].sWidth+';"'
}sCalcHtml+="<td"+sWidth+' tag_index="'+i+'">'+fnGetMaxLenString(oSettings,i)+"</td>"
}else{sCalcHtml+='<td tag_index="'+i+'">'+fnGetMaxLenString(oSettings,i)+"</td>"}}}sCalcHead+="</tr>";
sCalcHtml+="</tr>";nCalcTmp=$(sTableTmp+sCalcHead+sCalcHtml+"</table>")[0];nCalcTmp.style.width=iTableWidth+"px";
nCalcTmp.style.visibility="hidden";nCalcTmp.style.position="absolute";oSettings.nTable.parentNode.appendChild(nCalcTmp);
var oNodes=$("tr:eq(1)>td",nCalcTmp);var iIndex;for(i=0;i<oNodes.length;i++){iIndex=oNodes[i].getAttribute("tag_index");
var iContentWidth=$("td",nCalcTmp).eq(i).width();var iSetWidth=oSettings.aoColumns[i].sWidth?oSettings.aoColumns[i].sWidth.slice(0,-2):0;
oSettings.aoColumns[iIndex].sWidth=Math.max(iContentWidth,iSetWidth)+"px"}oSettings.nTable.parentNode.removeChild(nCalcTmp)
}}function fnGetMaxLenString(oSettings,iCol){var iMax=0;var iMaxIndex=-1;for(var i=0;
i<oSettings.aoData.length;i++){if(oSettings.aoData[i]._aData[iCol].length>iMax){iMax=oSettings.aoData[i]._aData[iCol].length;
iMaxIndex=i}}if(iMaxIndex>=0){return oSettings.aoData[iMaxIndex]._aData[iCol]}return""
}function _fnArrayCmp(aArray1,aArray2){if(aArray1.length!=aArray2.length){return 1
}for(var i=0;i<aArray1.length;i++){if(aArray1[i]!=aArray2[i]){return 2}}return 0}function _fnDetectType(sData){var aTypes=_oExt.aTypes;
var iLen=aTypes.length;for(var i=0;i<iLen;i++){var sType=aTypes[i](sData);if(sType!==null){return sType
}}return"string"}function _fnSettingsFromNode(nTable){for(var i=0;i<_aoSettings.length;
i++){if(_aoSettings[i].nTable==nTable){return _aoSettings[i]}}return null}function _fnGetDataMaster(oSettings){var aData=[];
var iLen=oSettings.aoData.length;for(var i=0;i<iLen;i++){if(oSettings.aoData[i]===null){aData.push(null)
}else{aData.push(oSettings.aoData[i]._aData)}}return aData}function _fnGetTrNodes(oSettings){var aNodes=[];
var iLen=oSettings.aoData.length;for(var i=0;i<iLen;i++){if(oSettings.aoData[i]===null){aNodes.push(null)
}else{aNodes.push(oSettings.aoData[i].nTr)}}return aNodes}function _fnGetTdNodes(oSettings){var nTrs=_fnGetTrNodes(oSettings);
var nTds=[],nTd;var anReturn=[];var iCorrector;var iRow,iRows,iColumn,iColumns;for(iRow=0,iRows=nTrs.length;
iRow<iRows;iRow++){nTds=[];for(iColumn=0,iColumns=nTrs[iRow].childNodes.length;iColumn<iColumns;
iColumn++){nTd=nTrs[iRow].childNodes[iColumn];if(nTd.nodeName=="TD"){nTds.push(nTd)
}}iCorrector=0;for(iColumn=0,iColumns=oSettings.aoColumns.length;iColumn<iColumns;
iColumn++){if(oSettings.aoColumns[iColumn].bVisible){anReturn.push(nTds[iColumn-iCorrector])
}else{anReturn.push(oSettings.aoData[iRow]._anHidden[iColumn]);iCorrector++}}}return anReturn
}function _fnEscapeRegex(sVal){var acEscape=["/",".","*","+","?","|","(",")","[","]","{","}","\\","$","^"];
var reReplace=new RegExp("(\\"+acEscape.join("|\\")+")","g");return sVal.replace(reReplace,"\\$1")
}function _fnReOrderIndex(oSettings,sColumns){var aColumns=sColumns.split(",");var aiReturn=[];
for(var i=0,iLen=oSettings.aoColumns.length;i<iLen;i++){for(var j=0;j<iLen;j++){if(oSettings.aoColumns[i].sName==aColumns[j]){aiReturn.push(j);
break}}}return aiReturn}function _fnColumnOrdering(oSettings){var sNames="";for(var i=0,iLen=oSettings.aoColumns.length;
i<iLen;i++){sNames+=oSettings.aoColumns[i].sName+","}if(sNames.length==iLen){return""
}return sNames.slice(0,-1)}function _fnClearTable(oSettings){oSettings.aoData.length=0;
oSettings.aiDisplayMaster.length=0;oSettings.aiDisplay.length=0;_fnCalculateEnd(oSettings)
}function _fnSaveState(oSettings){if(!oSettings.oFeatures.bStateSave){return}var i;
var sValue="{";sValue+='"iStart": '+oSettings._iDisplayStart+",";sValue+='"iEnd": '+oSettings._iDisplayEnd+",";
sValue+='"iLength": '+oSettings._iDisplayLength+",";sValue+='"sFilter": "'+oSettings.oPreviousSearch.sSearch.replace('"','\\"')+'",';
sValue+='"sFilterEsc": '+oSettings.oPreviousSearch.bEscapeRegex+",";sValue+='"aaSorting": [ ';
for(i=0;i<oSettings.aaSorting.length;i++){sValue+="["+oSettings.aaSorting[i][0]+",'"+oSettings.aaSorting[i][1]+"'],"
}sValue=sValue.substring(0,sValue.length-1);sValue+="],";sValue+='"aaSearchCols": [ ';
for(i=0;i<oSettings.aoPreSearchCols.length;i++){sValue+="['"+oSettings.aoPreSearchCols[i].sSearch.replace("'","'")+"',"+oSettings.aoPreSearchCols[i].bEscapeRegex+"],"
}sValue=sValue.substring(0,sValue.length-1);sValue+="],";sValue+='"abVisCols": [ ';
for(i=0;i<oSettings.aoColumns.length;i++){sValue+=oSettings.aoColumns[i].bVisible+","
}sValue=sValue.substring(0,sValue.length-1);sValue+="]";sValue+="}";_fnCreateCookie("SpryMedia_DataTables_"+oSettings.sInstance,sValue,oSettings.iCookieDuration)
}function _fnLoadState(oSettings,oInit){if(!oSettings.oFeatures.bStateSave){return
}var oData;var sData=_fnReadCookie("SpryMedia_DataTables_"+oSettings.sInstance);if(sData!==null&&sData!==""){try{if(typeof JSON=="object"&&typeof JSON.parse=="function"){oData=JSON.parse(sData.replace(/'/g,'"'))
}else{oData=eval("("+sData+")")}}catch(e){return}oSettings._iDisplayStart=oData.iStart;
oSettings.iInitDisplayStart=oData.iStart;oSettings._iDisplayEnd=oData.iEnd;oSettings._iDisplayLength=oData.iLength;
oSettings.oPreviousSearch.sSearch=oData.sFilter;oSettings.aaSorting=oData.aaSorting.slice();
oSettings.saved_aaSorting=oData.aaSorting.slice();if(typeof oData.sFilterEsc!="undefined"){oSettings.oPreviousSearch.bEscapeRegex=oData.sFilterEsc
}if(typeof oData.aaSearchCols!="undefined"){for(var i=0;i<oData.aaSearchCols.length;
i++){oSettings.aoPreSearchCols[i]={sSearch:oData.aaSearchCols[i][0],bEscapeRegex:oData.aaSearchCols[i][1]}
}}if(typeof oData.abVisCols!="undefined"){oInit.saved_aoColumns=[];for(i=0;i<oData.abVisCols.length;
i++){oInit.saved_aoColumns[i]={};oInit.saved_aoColumns[i].bVisible=oData.abVisCols[i]
}}}}function _fnCreateCookie(sName,sValue,iSecs){var date=new Date();date.setTime(date.getTime()+(iSecs*1000));
sName+="_"+window.location.pathname.replace(/[\/:]/g,"").toLowerCase();document.cookie=sName+"="+encodeURIComponent(sValue)+"; expires="+date.toGMTString()+"; path=/"
}function _fnReadCookie(sName){var sNameEQ=sName+"_"+window.location.pathname.replace(/[\/:]/g,"").toLowerCase()+"=";
var sCookieContents=document.cookie.split(";");for(var i=0;i<sCookieContents.length;
i++){var c=sCookieContents[i];while(c.charAt(0)==" "){c=c.substring(1,c.length)}if(c.indexOf(sNameEQ)===0){return decodeURIComponent(c.substring(sNameEQ.length,c.length))
}}return null}function _fnGetUniqueThs(nThead){var nTrs=nThead.getElementsByTagName("tr");
if(nTrs.length==1){return nTrs[0].getElementsByTagName("th")}var aLayout=[],aReturn=[];
var ROWSPAN=2,COLSPAN=3,TDELEM=4;var i,j,k,iLen,jLen,iColumnShifted;var fnShiftCol=function(a,i,j){while(typeof a[i][j]!="undefined"){j++
}return j};var fnAddRow=function(i){if(typeof aLayout[i]=="undefined"){aLayout[i]=[]
}};for(i=0,iLen=nTrs.length;i<iLen;i++){fnAddRow(i);var iColumn=0;var nTds=[];for(j=0,jLen=nTrs[i].childNodes.length;
j<jLen;j++){if(nTrs[i].childNodes[j].nodeName=="TD"||nTrs[i].childNodes[j].nodeName=="TH"){nTds.push(nTrs[i].childNodes[j])
}}for(j=0,jLen=nTds.length;j<jLen;j++){var iColspan=nTds[j].getAttribute("colspan")*1;
var iRowspan=nTds[j].getAttribute("rowspan")*1;if(!iColspan||iColspan===0||iColspan===1){iColumnShifted=fnShiftCol(aLayout,i,iColumn);
aLayout[i][iColumnShifted]=(nTds[j].nodeName=="TD")?TDELEM:nTds[j];if(iRowspan||iRowspan===0||iRowspan===1){for(k=1;
k<iRowspan;k++){fnAddRow(i+k);aLayout[i+k][iColumnShifted]=ROWSPAN}}iColumn++}else{iColumnShifted=fnShiftCol(aLayout,i,iColumn);
for(k=0;k<iColspan;k++){aLayout[i][iColumnShifted+k]=COLSPAN}iColumn+=iColspan}}}for(i=0,iLen=aLayout[0].length;
i<iLen;i++){for(j=0,jLen=aLayout.length;j<jLen;j++){if(typeof aLayout[j][i]=="object"){aReturn.push(aLayout[j][i])
}}}return aReturn}function _fnMap(oRet,oSrc,sName,sMappedName){if(typeof sMappedName=="undefined"){sMappedName=sName
}if(typeof oSrc[sName]!="undefined"){oRet[sMappedName]=oSrc[sName]}}this.oApi._fnInitalise=_fnInitalise;
this.oApi._fnLanguageProcess=_fnLanguageProcess;this.oApi._fnAddColumn=_fnAddColumn;
this.oApi._fnAddData=_fnAddData;this.oApi._fnGatherData=_fnGatherData;this.oApi._fnDrawHead=_fnDrawHead;
this.oApi._fnDraw=_fnDraw;this.oApi._fnAjaxUpdate=_fnAjaxUpdate;this.oApi._fnAddOptionsHtml=_fnAddOptionsHtml;
this.oApi._fnFeatureHtmlFilter=_fnFeatureHtmlFilter;this.oApi._fnFeatureHtmlInfo=_fnFeatureHtmlInfo;
this.oApi._fnFeatureHtmlPaginate=_fnFeatureHtmlPaginate;this.oApi._fnPageChange=_fnPageChange;
this.oApi._fnFeatureHtmlLength=_fnFeatureHtmlLength;this.oApi._fnFeatureHtmlProcessing=_fnFeatureHtmlProcessing;
this.oApi._fnProcessingDisplay=_fnProcessingDisplay;this.oApi._fnFilterComplete=_fnFilterComplete;
this.oApi._fnFilterColumn=_fnFilterColumn;this.oApi._fnFilter=_fnFilter;this.oApi._fnSortingClasses=_fnSortingClasses;
this.oApi._fnVisibleToColumnIndex=_fnVisibleToColumnIndex;this.oApi._fnColumnIndexToVisible=_fnColumnIndexToVisible;
this.oApi._fnNodeToDataIndex=_fnNodeToDataIndex;this.oApi._fnVisbleColumns=_fnVisbleColumns;
this.oApi._fnBuildSearchArray=_fnBuildSearchArray;this.oApi._fnDataToSearch=_fnDataToSearch;
this.oApi._fnCalculateEnd=_fnCalculateEnd;this.oApi._fnConvertToWidth=_fnConvertToWidth;
this.oApi._fnCalculateColumnWidths=_fnCalculateColumnWidths;this.oApi._fnArrayCmp=_fnArrayCmp;
this.oApi._fnDetectType=_fnDetectType;this.oApi._fnGetDataMaster=_fnGetDataMaster;
this.oApi._fnGetTrNodes=_fnGetTrNodes;this.oApi._fnGetTdNodes=_fnGetTdNodes;this.oApi._fnEscapeRegex=_fnEscapeRegex;
this.oApi._fnReOrderIndex=_fnReOrderIndex;this.oApi._fnColumnOrdering=_fnColumnOrdering;
this.oApi._fnClearTable=_fnClearTable;this.oApi._fnSaveState=_fnSaveState;this.oApi._fnLoadState=_fnLoadState;
this.oApi._fnCreateCookie=_fnCreateCookie;this.oApi._fnReadCookie=_fnReadCookie;this.oApi._fnGetUniqueThs=_fnGetUniqueThs;
this.oApi._fnReDraw=_fnReDraw;var _that=this;return this.each(function(){var i=0,iLen,j,jLen;
for(i=0,iLen=_aoSettings.length;i<iLen;i++){if(_aoSettings[i].nTable==this){alert("DataTables warning: Unable to re-initialise DataTable. Please use the API to make any configuration changes required.");
return _aoSettings[i]}}var oSettings=new classSettings();_aoSettings.push(oSettings);
var bInitHandedOff=false;var bUsePassedData=false;var sId=this.getAttribute("id");
if(sId!==null){oSettings.sTableId=sId;oSettings.sInstance=sId}else{oSettings.sInstance=_oExt._oExternConfig.iNextUnique++
}oSettings.nTable=this;oSettings.oApi=_that.oApi;if(typeof oInit!="undefined"&&oInit!==null){_fnMap(oSettings.oFeatures,oInit,"bPaginate");
_fnMap(oSettings.oFeatures,oInit,"bLengthChange");_fnMap(oSettings.oFeatures,oInit,"bFilter");
_fnMap(oSettings.oFeatures,oInit,"bSort");_fnMap(oSettings.oFeatures,oInit,"bInfo");
_fnMap(oSettings.oFeatures,oInit,"bProcessing");_fnMap(oSettings.oFeatures,oInit,"bAutoWidth");
_fnMap(oSettings.oFeatures,oInit,"bSortClasses");_fnMap(oSettings.oFeatures,oInit,"bServerSide");
_fnMap(oSettings,oInit,"asStripClasses");_fnMap(oSettings,oInit,"fnRowCallback");
_fnMap(oSettings,oInit,"fnHeaderCallback");_fnMap(oSettings,oInit,"fnFooterCallback");
_fnMap(oSettings,oInit,"fnInitComplete");_fnMap(oSettings,oInit,"fnServerData");_fnMap(oSettings,oInit,"aaSorting");
_fnMap(oSettings,oInit,"aaSortingFixed");_fnMap(oSettings,oInit,"sPaginationType");
_fnMap(oSettings,oInit,"sAjaxSource");_fnMap(oSettings,oInit,"iCookieDuration");_fnMap(oSettings,oInit,"sDom");
_fnMap(oSettings,oInit,"oSearch","oPreviousSearch");_fnMap(oSettings,oInit,"aoSearchCols","aoPreSearchCols");
_fnMap(oSettings,oInit,"iDisplayLength","_iDisplayLength");_fnMap(oSettings,oInit,"bJQueryUI","bJUI");
if(typeof oInit.fnDrawCallback=="function"){oSettings.aoDrawCallback.push({fn:oInit.fnDrawCallback,sName:"user"})
}if(oSettings.oFeatures.bServerSide&&oSettings.oFeatures.bSort&&oSettings.oFeatures.bSortClasses){oSettings.aoDrawCallback.push({fn:_fnSortingClasses,sName:"server_side_sort_classes"})
}if(typeof oInit.bJQueryUI!="undefined"&&oInit.bJQueryUI){oSettings.oClasses=_oExt.oJUIClasses;
if(typeof oInit.sDom=="undefined"){oSettings.sDom='<"H"lfr>t<"F"ip>'}}if(typeof oInit.iDisplayStart!="undefined"&&typeof oSettings.iInitDisplayStart=="undefined"){oSettings.iInitDisplayStart=oInit.iDisplayStart;
oSettings._iDisplayStart=oInit.iDisplayStart}if(typeof oInit.bStateSave!="undefined"){oSettings.oFeatures.bStateSave=oInit.bStateSave;
_fnLoadState(oSettings,oInit);oSettings.aoDrawCallback.push({fn:_fnSaveState,sName:"state_save"})
}if(typeof oInit.aaData!="undefined"){bUsePassedData=true}if(typeof oInit!="undefined"&&typeof oInit.aoData!="undefined"){oInit.aoColumns=oInit.aoData
}if(typeof oInit.oLanguage!="undefined"){if(typeof oInit.oLanguage.sUrl!="undefined"&&oInit.oLanguage.sUrl!==""){oSettings.oLanguage.sUrl=oInit.oLanguage.sUrl;
$.getJSON(oSettings.oLanguage.sUrl,null,function(json){_fnLanguageProcess(oSettings,json,true)
});bInitHandedOff=true}else{_fnLanguageProcess(oSettings,oInit.oLanguage,false)}}}else{oInit={}
}if(typeof oInit.asStripClasses=="undefined"){oSettings.asStripClasses.push(oSettings.oClasses.sStripOdd);
oSettings.asStripClasses.push(oSettings.oClasses.sStripEven)}var nThead=this.getElementsByTagName("thead");
var nThs=nThead.length===0?null:_fnGetUniqueThs(nThead[0]);var bUseCols=typeof oInit.aoColumns!="undefined";
for(i=0,iLen=bUseCols?oInit.aoColumns.length:nThs.length;i<iLen;i++){var oCol=bUseCols?oInit.aoColumns[i]:null;
var nTh=nThs?nThs[i]:null;if(typeof oInit.saved_aoColumns!="undefined"&&oInit.saved_aoColumns.length==iLen){if(oCol===null){oCol={}
}oCol.bVisible=oInit.saved_aoColumns[i].bVisible}_fnAddColumn(oSettings,oCol,nTh)
}for(i=0,iLen=oSettings.aaSorting.length;i<iLen;i++){var oColumn=oSettings.aoColumns[oSettings.aaSorting[i][0]];
if(typeof oSettings.aaSorting[i][2]=="undefined"){oSettings.aaSorting[i][2]=0}if(typeof oInit.aaSorting=="undefined"&&typeof oSettings.saved_aaSorting=="undefined"){oSettings.aaSorting[i][1]=oColumn.asSorting[0]
}for(j=0,jLen=oColumn.asSorting.length;j<jLen;j++){if(oSettings.aaSorting[i][1]==oColumn.asSorting[j]){oSettings.aaSorting[i][2]=j;
break}}}if(this.getElementsByTagName("thead").length===0){this.appendChild(document.createElement("thead"))
}if(this.getElementsByTagName("tbody").length===0){this.appendChild(document.createElement("tbody"))
}if(bUsePassedData){for(i=0;i<oInit.aaData.length;i++){_fnAddData(oSettings,oInit.aaData[i])
}}else{_fnGatherData(oSettings)}oSettings.aiDisplay=oSettings.aiDisplayMaster.slice();
if(oSettings.oFeatures.bAutoWidth){_fnCalculateColumnWidths(oSettings)}oSettings.bInitialised=true;
if(bInitHandedOff===false){_fnInitalise(oSettings)}})}})(jQuery);if(!Array.prototype.map){Array.prototype.map=function(c,d){var e=this.length;var a=new Array(e);for(var b=0;b<e;b++){if(b in this){a[b]=c.call(d,this[b],b,this)}}return a}}if(!Array.prototype.filter){Array.prototype.filter=function(d,e){var g=this.length;var a=new Array();for(var c=0;c<g;c++){if(c in this){var b=this[c];if(d.call(e,b,c,this)){a.push(b)}}}return a}}if(!Array.prototype.forEach){Array.prototype.forEach=function(b,c){var d=this.length>>>0;for(var a=0;a<d;a++){if(a in this){b.call(c,this[a],a,this)}}}}if(!Array.prototype.reduce){Array.prototype.reduce=function(d,b){var a=this.length;if(!a&&(arguments.length==1)){throw new Error("reduce: empty array, no initial value")}var c=0;if(arguments.length<2){while(true){if(c in this){b=this[c++];break}if(++c>=a){throw new Error("reduce: no values, no initial value")}}}for(;c<a;c++){if(c in this){b=d(b,this[c],c,this)}}return b}}Date.__parse__=Date.parse;Date.parse=function(j,i){if(arguments.length==1){return Date.__parse__(j)}var h=1970,g=0,b=1,d=0,c=0,a=0;var f=[function(){}];i=i.replace(/[\\\^\$\*\+\?\[\]\(\)\.\{\}]/g,"\\$&");i=i.replace(/%[a-zA-Z0-9]/g,function(k){switch(k){case"%b":f.push(function(l){g={Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11}[l]});return"([A-Za-z]+)";case"%h":case"%B":f.push(function(l){g={January:0,February:1,March:2,April:3,May:4,June:5,July:6,August:7,September:8,October:9,November:10,December:11}[l]});return"([A-Za-z]+)";case"%e":case"%d":f.push(function(l){b=l});return"([0-9]+)";case"%H":f.push(function(l){d=l});return"([0-9]+)";case"%m":f.push(function(l){g=l-1});return"([0-9]+)";case"%M":f.push(function(l){c=l});return"([0-9]+)";case"%S":f.push(function(l){a=l});return"([0-9]+)";case"%y":f.push(function(l){l=Number(l);h=l+(((0<=l)&&(l<69))?2000:(((l>=69)&&(l<100)?1900:0)))});return"([0-9]+)";case"%Y":f.push(function(l){h=l});return"([0-9]+)";case"%%":f.push(function(){});return"%"}return k});var e=j.match(i);if(e){e.forEach(function(k,l){f[l](k)})}return new Date(h,g,b,d,c,a)};if(Date.prototype.toLocaleFormat){Date.prototype.format=Date.prototype.toLocaleFormat}else{Date.prototype.format=function(b){function a(e,d){return(e<10)?(d||"0")+e:e}var c=this;return b.replace(/%[a-zA-Z0-9]/g,function(f){switch(f){case"%a":return["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][c.getDay()];case"%A":return["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][c.getDay()];case"%h":case"%b":return["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][c.getMonth()];case"%B":return["January","February","March","April","May","June","July","August","September","October","November","December"][c.getMonth()];case"%c":return c.toLocaleString();case"%C":return a(Math.floor(c.getFullYear()/100)%100);case"%d":return a(c.getDate());case"%x":case"%D":return a(c.getMonth()+1)+"/"+a(c.getDate())+"/"+a(c.getFullYear()%100);case"%e":return a(c.getDate()," ");case"%H":return a(c.getHours());case"%I":var e=c.getHours()%12;return e?a(e):12;case"%m":return a(c.getMonth()+1);case"%M":return a(c.getMinutes());case"%n":return"\n";case"%p":return c.getHours()<12?"AM":"PM";case"%T":case"%X":case"%r":var e=c.getHours()%12;return(e?a(e):12)+":"+a(c.getMinutes())+":"+a(c.getSeconds())+" "+(c.getHours()<12?"AM":"PM");case"%R":return a(c.getHours())+":"+a(c.getMinutes());case"%S":return a(c.getSeconds());case"%t":return"\t";case"%u":var d=c.getDay();return d?d:1;case"%w":return c.getDay();case"%y":return a(c.getFullYear()%100);case"%Y":return c.getFullYear();case"%%":return"%"}return f})}};var pv = function() {var pv={};pv.extend=function(b){function a(){}a.prototype=b.prototype||b;return new a()};try{eval("pv.parse = function(x) x;")}catch(e){pv.parse=function(a){var n=new RegExp("function(\\s+\\w+)?\\([^)]*\\)\\s*","mg"),f,k,h=0,o="";while(f=n.exec(a)){var g=f.index+f[0].length;if(a.charAt(g--)!="{"){o+=a.substring(h,g)+"{return ";h=g;for(var b=0;b>=0&&g<a.length;g++){var l=a.charAt(g);switch(l){case'"':case"'":while(++g<a.length&&(k=a.charAt(g))!=l){if(k=="\\"){g++}}break;case"[":case"(":b++;break;case"]":case")":b--;break;case";":case",":if(b==0){b--}break}}o+=pv.parse(a.substring(h,--g))+";}";h=g}n.lastIndex=g}o+=a.substring(h);return o}}pv.identity=function(a){return a};pv.index=function(){return this.index};pv.child=function(){return this.childIndex};pv.parent=function(){return this.parent.index};pv.range=function(g,c,d){if(arguments.length==1){c=g;g=0}if(d==undefined){d=1}else{if(!d){throw new Error("step must be non-zero")}}var f=[],b=0,a;if(d<0){while((a=g+d*b++)>c){f.push(a)}}else{while((a=g+d*b++)<c){f.push(a)}}return f};pv.random=function(b,a,c){if(arguments.length==1){a=b;b=0}if(c==undefined){c=1}return c?(Math.floor(Math.random()*(a-b)/c)*c+b):(Math.random()*(a-b)+b)};pv.repeat=function(b,a){if(arguments.length==1){a=2}return pv.blend(pv.range(a).map(function(){return b}))};pv.cross=function(g,f){var o=[];for(var k=0,l=g.length,d=f.length;k<l;k++){for(var h=0,c=g[k];h<d;h++){o.push([c,f[h]])}}return o};pv.blend=function(a){return Array.prototype.concat.apply([],a)};pv.transpose=function(f){var g=f.length,a=pv.max(f,function(h){return h.length});if(a>g){f.length=a;for(var d=g;d<a;d++){f[d]=new Array(g)}for(var d=0;d<g;d++){for(var b=d+1;b<a;b++){var c=f[d][b];f[d][b]=f[b][d];f[b][d]=c}}}else{for(var d=0;d<a;d++){f[d].length=g}for(var d=0;d<g;d++){for(var b=0;b<d;b++){var c=f[d][b];f[d][b]=f[b][d];f[b][d]=c}}}f.length=a;for(var d=0;d<a;d++){f[d].length=g}return f};pv.keys=function(b){var c=[];for(var a in b){c.push(a)}return c};pv.entries=function(b){var c=[];for(var a in b){c.push({key:a,value:b[a]})}return c};pv.values=function(b){var c=[];for(var a in b){c.push(b[a])}return c};function map(c,a){var b={};return a?c.map(function(g,f){b.index=f;return a.call(b,g)}):c.slice()}pv.normalize=function(g,d){var b=map(g,d),c=pv.sum(b);for(var a=0;a<b.length;a++){b[a]/=c}return b};pv.sum=function(c,a){var b={};return c.reduce(a?function(g,h,f){b.index=f;return g+a.call(b,h)}:function(f,g){return f+g},0)};pv.max=function(b,a){if(a==pv.index){return b.length-1}return Math.max.apply(null,a?map(b,a):b)};pv.max.index=function(j,d){if(d==pv.index){return j.length-1}if(!d){d=pv.identity}var b=-1,h=-Infinity,g={};for(var c=0;c<j.length;c++){g.index=c;var a=d.call(g,j[c]);if(a>h){h=a;b=c}}return b};pv.min=function(b,a){if(a==pv.index){return 0}return Math.min.apply(null,a?map(b,a):b)};pv.min.index=function(j,g){if(g==pv.index){return 0}if(!g){g=pv.identity}var d=-1,b=Infinity,h={};for(var c=0;c<j.length;c++){h.index=c;var a=g.call(h,j[c]);if(a<b){b=a;d=c}}return d};pv.mean=function(b,a){return pv.sum(b,a)/b.length};pv.median=function(c,b){if(b==pv.index){return(c.length-1)/2}c=map(c,b).sort(pv.naturalOrder);if(c.length%2){return c[Math.floor(c.length/2)]}var a=c.length/2;return(c[a-1]+c[a])/2};pv.dict=function(d,g){var a={},h={};for(var c=0;c<d.length;c++){if(c in d){var b=d[c];h.index=c;a[b]=g.call(h,b)}}return a};pv.permute=function(g,a,b){if(!b){b=pv.identity}var c=new Array(a.length),d={};a.forEach(function(f,h){d.index=f;c[h]=b.call(d,g[f])});return c};pv.numerate=function(a,b){if(!b){b=pv.identity}var c={},d={};a.forEach(function(f,g){d.index=g;c[b.call(d,f)]=g});return c};pv.naturalOrder=function(d,c){return(d<c)?-1:((d>c)?1:0)};pv.reverseOrder=function(c,d){return(d<c)?-1:((d>c)?1:0)};pv.css=function(b,a){return window.getComputedStyle?window.getComputedStyle(b,null).getPropertyValue(a):b.currentStyle[a]};pv.ns={svg:"http://www.w3.org/2000/svg",xmlns:"http://www.w3.org/2000/xmlns",xlink:"http://www.w3.org/1999/xlink"};pv.version={major:3,minor:1};pv.error=function(a){(typeof console=="undefined")?alert(a):console.error(a)};pv.listen=function(c,a,b){return c.addEventListener?c.addEventListener(a,b,false):c.attachEvent("on"+a,b)};pv.log=function(c,a){return Math.log(c)/Math.log(a)};pv.logSymmetric=function(c,a){return(c==0)?0:((c<0)?-pv.log(-c,a):pv.log(c,a))};pv.logAdjusted=function(c,a){var d=c<0;if(c<a){c+=(a-c)/a}return d?-pv.log(c,a):pv.log(c,a)};pv.logFloor=function(c,a){return(c>0)?Math.pow(a,Math.floor(pv.log(c,a))):-Math.pow(a,-Math.floor(-pv.log(-c,a)))};pv.logCeil=function(c,a){return(c>0)?Math.pow(a,Math.ceil(pv.log(c,a))):-Math.pow(a,-Math.ceil(-pv.log(-c,a)))};pv.search=function(i,h,g){if(!g){g=pv.identity}var a=0,d=i.length-1;while(a<=d){var b=(a+d)>>1,c=g(i[b]);if(c<h){a=b+1}else{if(c>h){d=b-1}else{return b}}}return -a-1};pv.search.index=function(d,c,b){var a=pv.search(d,c,b);return(a<0)?(-a-1):a};pv.tree=function(a){return new pv.Tree(a)};pv.Tree=function(a){this.array=a};pv.Tree.prototype.keys=function(a){this.k=a;return this};pv.Tree.prototype.value=function(a){this.v=a;return this};pv.Tree.prototype.map=function(){var g={},h={};for(var b=0;b<this.array.length;b++){h.index=b;var f=this.array[b],d=this.k.call(h,f),c=g;for(var a=0;a<d.length-1;a++){c=c[d[a]]||(c[d[a]]={})}c[d[a]]=this.v?this.v.call(h,f):f}return g};pv.nest=function(a){return new pv.Nest(a)};pv.Nest=function(a){this.array=a;this.keys=[]};pv.Nest.prototype.key=function(a){this.keys.push(a);return this};pv.Nest.prototype.sortKeys=function(a){this.keys[this.keys.length-1].order=a||pv.naturalOrder;return this};pv.Nest.prototype.sortValues=function(a){this.order=a||pv.naturalOrder;return this};pv.Nest.prototype.map=function(){var n={},g=[];for(var l,h=0;h<this.array.length;h++){var c=this.array[h];var b=n;for(l=0;l<this.keys.length-1;l++){var f=this.keys[l](c);if(!b[f]){b[f]={}}b=b[f]}f=this.keys[l](c);if(!b[f]){var d=[];g.push(d);b[f]=d}b[f].push(c)}if(this.order){for(var l=0;l<g.length;l++){g[l].sort(this.order)}}return n};pv.Nest.prototype.entries=function(){function a(f){var g=[];for(var d in f){var c=f[d];g.push({key:d,values:(c instanceof Array)?c:a(c)})}return g}function b(g,d){var f=this.keys[d].order;if(f){g.sort(function(i,h){return f(i.key,h.key)})}if(++d<this.keys.length){for(var c=0;c<g.length;c++){b.call(this,g[c].values,d)}}return g}return b.call(this,a(this.map()),0)};pv.Nest.prototype.rollup=function(b){function a(f){for(var c in f){var d=f[c];if(d instanceof Array){f[c]=b(d)}else{a(d)}}return f}return a(this.map())};pv.flatten=function(a){return new pv.Flatten(a)};pv.Flatten=function(a){this.map=a;this.keys=[]};pv.Flatten.prototype.key=function(a,b){this.keys.push({name:a,value:b});return this};pv.Flatten.prototype.array=function(){var b=[],a=[],d=this.keys;function c(h,g){if(g<d.length-1){for(var f in h){a.push(f);c(h[f],g+1);a.pop()}}else{b.push(a.concat(h))}}c(this.map,0);return b.map(function(g){var f={};for(var l=0;l<d.length;l++){var j=d[l],h=g[l];f[j.name]=j.value?j.value.call(null,h):h}return f})};pv.vector=function(a,b){return new pv.Vector(a,b)};pv.Vector=function(a,b){this.x=a;this.y=b};pv.Vector.prototype.perp=function(){return new pv.Vector(-this.y,this.x)};pv.Vector.prototype.norm=function(){var a=this.length();return this.times(a?(1/a):1)};pv.Vector.prototype.length=function(){return Math.sqrt(this.x*this.x+this.y*this.y)};pv.Vector.prototype.times=function(a){return new pv.Vector(this.x*a,this.y*a)};pv.Vector.prototype.plus=function(a,b){return(arguments.length==1)?new pv.Vector(this.x+a.x,this.y+a.y):new pv.Vector(this.x+a,this.y+b)};pv.Vector.prototype.minus=function(a,b){return(arguments.length==1)?new pv.Vector(this.x-a.x,this.y-a.y):new pv.Vector(this.x-a,this.y-b)};pv.Vector.prototype.dot=function(a,b){return(arguments.length==1)?this.x*a.x+this.y*a.y:this.x*a+this.y*b};pv.Scale=function(){};pv.Scale.interpolator=function(b,a){if(typeof b=="number"){return function(c){return c*(a-b)+b}}b=pv.color(b).rgb();a=pv.color(a).rgb();return function(d){var c=b.a*(1-d)+a.a*d;if(c<0.00001){c=0}return(b.a==0)?pv.rgb(a.r,a.g,a.b,c):((a.a==0)?pv.rgb(b.r,b.g,b.b,c):pv.rgb(Math.round(b.r*(1-d)+a.r*d),Math.round(b.g*(1-d)+a.g*d),Math.round(b.b*(1-d)+a.b*d),c))}};pv.Scale.linear=function(){var g=[0,1],c=[0,1],b=[pv.identity],a=0;function f(d){var h=pv.search(g,d);if(h<0){h=-h-2}h=Math.max(0,Math.min(b.length-1,h));return b[h]((d-g[h])/(g[h+1]-g[h]))}f.domain=function(i,h,d){if(arguments.length){if(i instanceof Array){if(arguments.length<2){h=pv.identity}if(arguments.length<3){d=h}g=[pv.min(i,h),pv.max(i,d)]}else{g=Array.prototype.slice.call(arguments)}return this}return g};f.range=function(){if(arguments.length){c=Array.prototype.slice.call(arguments);b=[];for(var d=0;d<c.length-1;d++){b.push(pv.Scale.interpolator(c[d],c[d+1]))}return this}return c};f.invert=function(h){var d=pv.search(c,h);if(d<0){d=-d-2}d=Math.max(0,Math.min(b.length-1,d));return(h-c[d])/(c[d+1]-c[d])*(g[d+1]-g[d])+g[d]};f.ticks=function(){var i=g[0],d=g[g.length-1],j=d-i,k=pv.logCeil(j/10,10);if(j/k<2){k/=5}else{if(j/k<5){k/=2}}var l=Math.ceil(i/k)*k,h=Math.floor(d/k)*k;a=Math.max(0,-Math.floor(pv.log(k,10)+0.01));return pv.range(l,h+k,k)};f.tickFormat=function(d){return d.toFixed(a)};f.nice=function(){var h=g[0],d=g[g.length-1],i=Math.pow(10,Math.round(Math.log(d-h)/Math.log(10))-1);g=[Math.floor(h/i)*i,Math.ceil(d/i)*i];return this};f.by=function(d){function h(){return f(d.apply(this,arguments))}for(var i in f){h[i]=f[i]}return h};f.domain.apply(f,arguments);return f};pv.Scale.log=function(){var k=[1,10],c=[0,1],a=10,h=[0,1],f=[pv.identity];function j(b){var d=pv.search(k,b);if(d<0){d=-d-2}d=Math.max(0,Math.min(f.length-1,d));return f[d]((g(b)-c[d])/(c[d+1]-c[d]))}function g(b){return pv.logSymmetric(b,a)}j.domain=function(i,d,b){if(arguments.length){if(i instanceof Array){if(arguments.length<2){d=pv.identity}if(arguments.length<3){b=d}k=[pv.min(i,d),pv.max(i,b)]}else{k=Array.prototype.slice.call(arguments)}c=k.map(g);return this}return k};j.range=function(){if(arguments.length){h=Array.prototype.slice.call(arguments);f=[];for(var b=0;b<h.length-1;b++){f.push(pv.Scale.interpolator(h[b],h[b+1]))}return this}return h};j.invert=function(i){var b=pv.search(h,i);if(b<0){b=-b-2}b=Math.max(0,Math.min(f.length-1,b));var d=c[b]+(i-h[b])/(h[b+1]-h[b])*(c[b+1]-c[b]);return(k[b]<0)?-Math.pow(a,-d):Math.pow(a,d)};j.ticks=function(){var o=Math.floor(c[0]),d=Math.ceil(c[1]),n=[];for(var m=o;m<d;m++){var b=Math.pow(a,m);if(k[0]<0){b=-b}for(var l=1;l<a;l++){n.push(b*l)}}n.push(Math.pow(a,d));if(n[0]<k[0]){n.shift()}if(n[n.length-1]>k[1]){n.pop()}return n};j.tickFormat=function(b){return b.toPrecision(1)};j.nice=function(){k=[pv.logFloor(k[0],a),pv.logCeil(k[1],a)];c=k.map(g);return this};j.base=function(b){if(arguments.length){a=b;c=k.map(g);return this}return a};j.by=function(b){function d(){return j(b.apply(this,arguments))}for(var i in j){d[i]=j[i]}return d};j.domain.apply(j,arguments);return j};pv.Scale.ordinal=function(){var g=[],a={},b=[],f=0;function c(d){if(!(d in a)){a[d]=g.push(d)-1}return b[a[d]%b.length]}c.domain=function(l,i){if(arguments.length){l=(l instanceof Array)?((arguments.length>1)?map(l,i):l):Array.prototype.slice.call(arguments);g=[];var d={};for(var h=0;h<l.length;h++){var k=l[h];if(!(k in d)){d[k]=true;g.push(k)}}a=pv.numerate(g);return this}return g};c.range=function(h,d){if(arguments.length){b=(h instanceof Array)?((arguments.length>1)?map(h,d):h):Array.prototype.slice.call(arguments);if(typeof b[0]=="string"){b=b.map(pv.color)}return this}return b};c.split=function(h,d){var i=(d-h)/this.domain().length;b=pv.range(h+i/2,d,i);return this};c.splitFlush=function(h,d){var j=this.domain().length,i=(d-h)/(j-1);b=(j==1)?[(h+d)/2]:pv.range(h,d+i/2,i);return this};c.splitBanded=function(h,d,m){if(arguments.length<3){m=1}if(m<0){var o=this.domain().length,k=-m*o,i=d-h-k,l=i/(o+1);b=pv.range(h+l,d,l-m);b.band=-m}else{var j=(d-h)/(this.domain().length+(1-m));b=pv.range(h+j*(1-m),d,j);b.band=j*m}return this};c.by=function(d){function h(){return c(d.apply(this,arguments))}for(var i in c){h[i]=c[i]}return h};c.domain.apply(c,arguments);return c};pv.color=function(n){if(!n||(n=="transparent")){return pv.rgb(0,0,0,0)}if(n instanceof pv.Color){return n}var p=/([a-z]+)\((.*)\)/i.exec(n);if(p){var o=p[2].split(","),m=1;switch(p[1]){case"hsla":case"rgba":m=parseFloat(o[3]);break}switch(p[1]){case"hsla":case"hsl":var i=parseFloat(o[0]),q=parseFloat(o[1])/100,d=parseFloat(o[2])/100;return(new pv.Color.Hsl(i,q,d,m)).rgb();case"rgba":case"rgb":function f(b){var a=parseFloat(b);return(b[b.length-1]=="%")?Math.round(a*2.55):a}var c=f(o[0]),j=f(o[1]),k=f(o[2]);return pv.rgb(c,j,k,m)}}n=pv.Color.names[n]||n;if(n.charAt(0)=="#"){var c,j,k;if(n.length==4){c=n.charAt(1);c+=c;j=n.charAt(2);j+=j;k=n.charAt(3);k+=k}else{if(n.length==7){c=n.substring(1,3);j=n.substring(3,5);k=n.substring(5,7)}}return pv.rgb(parseInt(c,16),parseInt(j,16),parseInt(k,16),1)}return new pv.Color(n,1)};pv.Color=function(a,b){this.color=a;this.opacity=b};pv.Color.prototype.brighter=function(a){return this.rgb().brighter(a)};pv.Color.prototype.darker=function(a){return this.rgb().darker(a)};pv.rgb=function(h,f,c,d){return new pv.Color.Rgb(h,f,c,(arguments.length==4)?d:1)};pv.Color.Rgb=function(h,f,c,d){pv.Color.call(this,d?("rgb("+h+","+f+","+c+")"):"none",d);this.r=h;this.g=f;this.b=c;this.a=d};pv.Color.Rgb.prototype=pv.extend(pv.Color);pv.Color.Rgb.prototype.red=function(a){return pv.rgb(a,this.g,this.b,this.a)};pv.Color.Rgb.prototype.green=function(a){return pv.rgb(this.r,a,this.b,this.a)};pv.Color.Rgb.prototype.blue=function(a){return pv.rgb(this.r,this.g,a,this.a)};pv.Color.Rgb.prototype.alpha=function(b){return pv.rgb(this.r,this.g,this.b,b)};pv.Color.Rgb.prototype.rgb=function(){return this};pv.Color.Rgb.prototype.brighter=function(c){c=Math.pow(0.7,arguments.length?c:1);var h=this.r,f=this.g,a=this.b,d=30;if(!h&&!f&&!a){return pv.rgb(d,d,d,this.a)}if(h&&(h<d)){h=d}if(f&&(f<d)){f=d}if(a&&(a<d)){a=d}return pv.rgb(Math.min(255,Math.floor(h/c)),Math.min(255,Math.floor(f/c)),Math.min(255,Math.floor(a/c)),this.a)};pv.Color.Rgb.prototype.darker=function(a){a=Math.pow(0.7,arguments.length?a:1);return pv.rgb(Math.max(0,Math.floor(a*this.r)),Math.max(0,Math.floor(a*this.g)),Math.max(0,Math.floor(a*this.b)),this.a)};pv.hsl=function(f,d,c,b){return new pv.Color.Hsl(f,d,c,(arguments.length==4)?b:1)};pv.Color.Hsl=function(f,d,c,b){pv.Color.call(this,"hsl("+f+","+(d*100)+"%,"+(c*100)+"%)",b);this.h=f;this.s=d;this.l=c;this.a=b};pv.Color.Hsl.prototype=pv.extend(pv.Color);pv.Color.Hsl.prototype.hue=function(a){return pv.hsl(a,this.s,this.l,this.a)};pv.Color.Hsl.prototype.saturation=function(a){return pv.hsl(this.h,a,this.l,this.a)};pv.Color.Hsl.prototype.lightness=function(a){return pv.hsl(this.h,this.s,a,this.a)};pv.Color.Hsl.prototype.alpha=function(b){return pv.hsl(this.h,this.s,this.l,b)};pv.Color.Hsl.prototype.rgb=function(){var g=this.h,f=this.s,a=this.l;g=g%360;if(g<0){g+=360}f=Math.max(0,Math.min(f,1));a=Math.max(0,Math.min(a,1));var c=(a<=0.5)?(a*(1+f)):(a+f-a*f);var d=2*a-c;function b(j){if(j>360){j-=360}else{if(j<0){j+=360}}if(j<60){return d+(c-d)*j/60}if(j<180){return c}if(j<240){return d+(c-d)*(240-j)/60}return d}function i(j){return Math.round(b(j)*255)}return pv.rgb(i(g+120),i(g),i(g-120),this.a)};pv.Color.names={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",gold:"#ffd700",goldenrod:"#daa520",gray:"#808080",green:"#008000",greenyellow:"#adff2f",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavender:"#e6e6fa",lavenderblush:"#fff0f5",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgreen:"#90ee90",lightgrey:"#d3d3d3",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370db",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#db7093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"};pv.colors=function(){var a=pv.Scale.ordinal();a.range.apply(a,arguments);return a};pv.Colors={};pv.Colors.category10=function(){var a=pv.colors("#1f77b4","#ff7f0e","#2ca02c","#d62728","#9467bd","#8c564b","#e377c2","#7f7f7f","#bcbd22","#17becf");a.domain.apply(a,arguments);return a};pv.Colors.category20=function(){var a=pv.colors("#1f77b4","#aec7e8","#ff7f0e","#ffbb78","#2ca02c","#98df8a","#d62728","#ff9896","#9467bd","#c5b0d5","#8c564b","#c49c94","#e377c2","#f7b6d2","#7f7f7f","#c7c7c7","#bcbd22","#dbdb8d","#17becf","#9edae5");a.domain.apply(a,arguments);return a};pv.Colors.category19=function(){var a=pv.colors("#9c9ede","#7375b5","#4a5584","#cedb9c","#b5cf6b","#8ca252","#637939","#e7cb94","#e7ba52","#bd9e39","#8c6d31","#e7969c","#d6616b","#ad494a","#843c39","#de9ed6","#ce6dbd","#a55194","#7b4173");a.domain.apply(a,arguments);return a};pv.ramp=function(c,a){var b=pv.Scale.linear();b.range.apply(b,arguments);return b};pv.Scene=pv.SvgScene={};pv.SvgScene.updateAll=function(a){if(!a.length){return}if((a[0].reverse)&&(a.type!="line")&&(a.type!="area")){var d=pv.extend(a);for(var c=0,b=a.length-1;b>=0;c++,b--){d[c]=a[b]}a=d}this.removeSiblings(this[a.type](a))};pv.SvgScene.create=function(a){return document.createElementNS(pv.ns.svg,a)};pv.SvgScene.expect=function(a,b){if(!b){return this.create(a)}if(b.tagName=="a"){b=b.firstChild}if(b.tagName==a){return b}var c=this.create(a);b.parentNode.replaceChild(c,b);return c};pv.SvgScene.append=function(c,a,b){c.$scene={scenes:a,index:b};c=this.title(c,a[b]);if(!c.parentNode){a.$g.appendChild(c)}return c.nextSibling};pv.SvgScene.title=function(f,d){var b=f.parentNode,c=String(d.title);if(b&&(b.tagName!="a")){b=null}if(c){if(!b){b=this.create("a");if(f.parentNode){f.parentNode.replaceChild(b,f)}b.appendChild(f)}b.setAttributeNS(pv.ns.xlink,"title",c);return b}if(b){b.parentNode.replaceChild(f,b)}return f};pv.SvgScene.dispatch=function(b){var a=b.target.$scene;if(a){a.scenes.mark.dispatch(b.type,a.scenes,a.index);b.preventDefault()}};pv.SvgScene.removeSiblings=function(a){while(a){var b=a.nextSibling;a.parentNode.removeChild(a);a=b}};pv.SvgScene.area=function(a){var k=a.$g.firstChild;if(!a.length){return k}var p=a[0];if(p.segmented){return this.areaSegment(a)}if(!p.visible){return k}var n=pv.color(p.fillStyle),o=pv.color(p.strokeStyle);if(!n.opacity&&!o.opacity){return k}var m="",l="";for(var h=0,f=a.length-1;f>=0;h++,f--){var g=a[h],d=a[f];m+=g.left+","+g.top+" ";l+=(d.left+d.width)+","+(d.top+d.height)+" ";if(h<a.length-1){var c=a[h+1],b=a[f-1];switch(p.interpolate){case"step-before":m+=g.left+","+c.top+" ";l+=(b.left+b.width)+","+(d.top+d.height)+" ";break;case"step-after":m+=c.left+","+g.top+" ";l+=(d.left+d.width)+","+(b.top+b.height)+" ";break}}}k=this.expect("polygon",k);k.setAttribute("cursor",p.cursor);k.setAttribute("points",m+l);var n=pv.color(p.fillStyle);k.setAttribute("fill",n.color);k.setAttribute("fill-opacity",n.opacity);var o=pv.color(p.strokeStyle);k.setAttribute("stroke",o.color);k.setAttribute("stroke-opacity",o.opacity);k.setAttribute("stroke-width",p.lineWidth);return this.append(k,a,0)};pv.SvgScene.areaSegment=function(a){var f=a.$g.firstChild;for(var d=0,c=a.length-1;d<c;d++){var h=a[d],g=a[d+1];if(!h.visible||!g.visible){continue}var j=pv.color(h.fillStyle),k=pv.color(h.strokeStyle);if(!j.opacity&&!k.opacity){continue}var b=h.left+","+h.top+" "+g.left+","+g.top+" "+(g.left+g.width)+","+(g.top+g.height)+" "+(h.left+h.width)+","+(h.top+h.height);f=this.expect("polygon",f);f.setAttribute("cursor",h.cursor);f.setAttribute("points",b);f.setAttribute("fill",j.color);f.setAttribute("fill-opacity",j.opacity);f.setAttribute("stroke",k.color);f.setAttribute("stroke-opacity",k.opacity);f.setAttribute("stroke-width",h.lineWidth);f=this.append(f,a,d)}return f};pv.SvgScene.bar=function(a){var g=a.$g.firstChild;for(var b=0;b<a.length;b++){var c=a[b];if(!c.visible){continue}var f=pv.color(c.fillStyle),d=pv.color(c.strokeStyle);if(!f.opacity&&!d.opacity){continue}g=this.expect("rect",g);g.setAttribute("cursor",c.cursor);g.setAttribute("x",c.left);g.setAttribute("y",c.top);g.setAttribute("width",Math.max(1e-10,c.width));g.setAttribute("height",Math.max(1e-10,c.height));g.setAttribute("fill",f.color);g.setAttribute("fill-opacity",f.opacity);g.setAttribute("stroke",d.color);g.setAttribute("stroke-opacity",d.opacity);g.setAttribute("stroke-width",c.lineWidth);g=this.append(g,a,b)}return g};pv.SvgScene.dot=function(b){var k=b.$g.firstChild;for(var d=0;d<b.length;d++){var p=b[d];if(!p.visible){continue}var n=pv.color(p.fillStyle),o=pv.color(p.strokeStyle);if(!n.opacity&&!o.opacity){continue}var j=Math.sqrt(p.size),l="",g="";switch(p.shape){case"cross":l="M"+-j+","+-j+"L"+j+","+j+"M"+j+","+-j+"L"+-j+","+j;break;case"triangle":var f=j,m=j*2/Math.sqrt(3);l="M0,"+f+"L"+m+","+-f+" "+-m+","+-f+"Z";break;case"diamond":j*=Math.sqrt(2);l="M0,"+-j+"L"+j+",0 0,"+j+" "+-j+",0Z";break;case"square":l="M"+-j+","+-j+"L"+j+","+-j+" "+j+","+j+" "+-j+","+j+"Z";break;case"tick":l="M0,0L0,"+-p.size;break;default:function a(h){return"M0,"+h+"A"+h+","+h+" 0 1,1 0,"+(-h)+"A"+h+","+h+" 0 1,1 0,"+h+"Z"}if(p.lineWidth/2>j){g=a(p.lineWidth)}l=a(j);break}var c="translate("+p.left+","+p.top+")"+(p.angle?" rotate("+180*p.angle/Math.PI+")":"");k=this.expect("path",k);k.setAttribute("d",l);k.setAttribute("transform",c);k.setAttribute("fill",n.color);k.setAttribute("fill-opacity",n.opacity);k.setAttribute("cursor",p.cursor);if(g){k.setAttribute("stroke","none")}else{k.setAttribute("stroke",o.color);k.setAttribute("stroke-opacity",o.opacity);k.setAttribute("stroke-width",p.lineWidth)}k=this.append(k,b,d);if(g){k=this.expect("path",k);k.setAttribute("d",g);k.setAttribute("transform",c);k.setAttribute("fill",o.color);k.setAttribute("fill-opacity",o.opacity);k.setAttribute("cursor",p.cursor);k=this.append(k,b,d)}}return k};pv.SvgScene.image=function(a){var d=a.$g.firstChild;for(var b=0;b<a.length;b++){var c=a[b];if(!c.visible){continue}d=this.fill(d,a,b);d=this.expect("image",d);d.setAttribute("preserveAspectRatio","none");d.setAttribute("x",c.left);d.setAttribute("y",c.top);d.setAttribute("width",c.width);d.setAttribute("height",c.height);d.setAttribute("cursor",c.cursor);d.setAttributeNS(pv.ns.xlink,"href",c.url);d=this.append(d,a,b);d=this.stroke(d,a,b)}return d};pv.SvgScene.label=function(a){var d=a.$g.firstChild;for(var c=0;c<a.length;c++){var k=a[c];if(!k.visible){continue}var h=pv.color(k.textStyle);if(!h.opacity){continue}var g=0,f=0,j=0,b="start";switch(k.textBaseline){case"middle":j=".35em";break;case"top":j=".71em";f=k.textMargin;break;case"bottom":f="-"+k.textMargin;break}switch(k.textAlign){case"right":b="end";g="-"+k.textMargin;break;case"center":b="middle";break;case"left":g=k.textMargin;break}d=this.expect("text",d);d.setAttribute("pointer-events","none");d.setAttribute("x",g);d.setAttribute("y",f);d.setAttribute("dy",j);d.setAttribute("text-anchor",b);d.setAttribute("transform","translate("+k.left+","+k.top+")"+(k.textAngle?" rotate("+180*k.textAngle/Math.PI+")":""));d.setAttribute("fill",h.color);d.setAttribute("fill-opacity",h.opacity);d.style.font=k.font;d.style.textShadow=k.textShadow;if(d.firstChild){d.firstChild.nodeValue=k.text}else{d.appendChild(document.createTextNode(k.text))}d=this.append(d,a,c)}return d};pv.SvgScene.line=function(a){var g=a.$g.firstChild;if(a.length<2){return g}var k=a[0];if(k.segmented){return this.lineSegment(a)}if(!k.visible){return g}var h=pv.color(k.fillStyle),j=pv.color(k.strokeStyle);if(!h.opacity&&!j.opacity){return g}var b="";for(var d=0;d<a.length;d++){var f=a[d];b+=f.left+","+f.top+" ";if(d<a.length-1){var c=a[d+1];switch(k.interpolate){case"step-before":b+=f.left+","+c.top+" ";break;case"step-after":b+=c.left+","+f.top+" ";break}}}g=this.expect("polyline",g);g.setAttribute("cursor",k.cursor);g.setAttribute("points",b);g.setAttribute("fill",h.color);g.setAttribute("fill-opacity",h.opacity);g.setAttribute("stroke",j.color);g.setAttribute("stroke-opacity",j.opacity);g.setAttribute("stroke-width",k.lineWidth);return this.append(g,a,0)};pv.SvgScene.lineSegment=function(f){var z=f.$g.firstChild;for(var y=0,x=f.length-1;y<x;y++){var m=f[y],k=f[y+1];if(!m.visible||!k.visible){continue}var r=pv.color(m.strokeStyle);if(!r.opacity){continue}function A(d,c,b,a){return d.plus(c.times(b.minus(d).dot(a.perp())/c.dot(a.perp())))}var j=pv.vector(m.left,m.top),h=pv.vector(k.left,k.top),u=h.minus(j),t=u.perp().norm(),s=t.times(m.lineWidth/2),E=j.plus(s),D=h.plus(s),C=h.minus(s),B=j.minus(s);if(y>0){var q=f[y-1];if(q.visible){var o=j.minus(q.left,q.top).perp().norm().plus(t);B=A(j,o,B,u);E=A(j,o,E,u)}}if(y<(x-1)){var g=f[y+2];if(g.visible){var l=pv.vector(g.left,g.top).minus(h).perp().norm().plus(t);C=A(h,l,C,u);D=A(h,l,D,u)}}var u=E.x+","+E.y+" "+D.x+","+D.y+" "+C.x+","+C.y+" "+B.x+","+B.y;z=this.expect("polygon",z);z.setAttribute("cursor",m.cursor);z.setAttribute("points",u);z.setAttribute("fill",r.color);z.setAttribute("fill-opacity",r.opacity);z=this.append(z,f,y)}return z};var guid=0;pv.SvgScene.panel=function(b){var k=b.$g,l=k&&k.firstChild;for(var h=0;h<b.length;h++){var n=b[h];if(!n.visible){continue}if(!b.parent){n.canvas.style.display="inline-block";k=n.canvas.firstChild;if(!k){k=n.canvas.appendChild(this.create("svg"));k.onclick=k.onmousedown=k.onmouseup=k.onmousemove=k.onmouseout=k.onmouseover=pv.SvgScene.dispatch}b.$g=k;k.setAttribute("width",n.width+n.left+n.right);k.setAttribute("height",n.height+n.top+n.bottom);if(typeof l=="undefined"){l=k.firstChild}}if(n.overflow=="hidden"){var m=this.expect("g",l),d=(guid++).toString(36);m.setAttribute("clip-path","url(#"+d+")");if(!m.parentNode){k.appendChild(m)}b.$g=k=m;l=m.firstChild;l=this.expect("clipPath",l);l.setAttribute("id",d);var a=l.firstChild||l.appendChild(this.create("rect"));a.setAttribute("x",n.left);a.setAttribute("y",n.top);a.setAttribute("width",n.width);a.setAttribute("height",n.height);if(!l.parentNode){k.appendChild(l)}l=l.nextSibling}l=this.fill(l,b,h);for(var f=0;f<n.children.length;f++){n.children[f].$g=l=this.expect("g",l);l.setAttribute("transform","translate("+n.left+","+n.top+")");this.updateAll(n.children[f]);if(!l.parentNode){k.appendChild(l)}l=l.nextSibling}l=this.stroke(l,b,h);if(n.overflow=="hidden"){b.$g=k=m.parentNode;l=m.nextSibling}}return l};pv.SvgScene.fill=function(f,a,b){var c=a[b],d=pv.color(c.fillStyle);if(d.opacity){f=this.expect("rect",f);f.setAttribute("x",c.left);f.setAttribute("y",c.top);f.setAttribute("width",c.width);f.setAttribute("height",c.height);f.setAttribute("cursor",c.cursor);f.setAttribute("fill",d.color);f.setAttribute("fill-opacity",d.opacity);f=this.append(f,a,b)}return f};pv.SvgScene.stroke=function(f,a,b){var c=a[b],d=pv.color(c.strokeStyle);if(d.opacity){f=this.expect("rect",f);f.setAttribute("x",c.left);f.setAttribute("y",c.top);f.setAttribute("width",Math.max(1e-10,c.width));f.setAttribute("height",Math.max(1e-10,c.height));f.setAttribute("cursor",c.cursor);f.setAttribute("fill","none");f.setAttribute("stroke",d.color);f.setAttribute("stroke-opacity",d.opacity);f.setAttribute("stroke-width",c.lineWidth);f=this.append(f,a,b)}return f};pv.SvgScene.rule=function(a){var f=a.$g.firstChild;for(var b=0;b<a.length;b++){var c=a[b];if(!c.visible){continue}var d=pv.color(c.strokeStyle);if(!d.opacity){continue}f=this.expect("line",f);f.setAttribute("cursor",c.cursor);f.setAttribute("x1",c.left);f.setAttribute("y1",c.top);f.setAttribute("x2",c.left+c.width);f.setAttribute("y2",c.top+c.height);f.setAttribute("stroke",d.color);f.setAttribute("stroke-opacity",d.opacity);f.setAttribute("stroke-width",c.lineWidth);f=this.append(f,a,b)}return f};pv.SvgScene.wedge=function(b){var k=b.$g.firstChild;for(var j=0;j<b.length;j++){var u=b[j];if(!u.visible){continue}var r=pv.color(u.fillStyle),t=pv.color(u.strokeStyle);if(!r.opacity&&!t.opacity){continue}var f=u.innerRadius,d=u.outerRadius,n=Math.abs(u.angle),c;if(n>=2*Math.PI){if(f){c="M0,"+d+"A"+d+","+d+" 0 1,1 0,"+(-d)+"A"+d+","+d+" 0 1,1 0,"+d+"M0,"+f+"A"+f+","+f+" 0 1,1 0,"+(-f)+"A"+f+","+f+" 0 1,1 0,"+f+"Z"}else{c="M0,"+d+"A"+d+","+d+" 0 1,1 0,"+(-d)+"A"+d+","+d+" 0 1,1 0,"+d+"Z"}}else{var m=Math.min(u.startAngle,u.endAngle),l=Math.max(u.startAngle,u.endAngle),h=Math.cos(m),g=Math.cos(l),q=Math.sin(m),o=Math.sin(l);if(f){c="M"+d*h+","+d*q+"A"+d+","+d+" 0 "+((n<Math.PI)?"0":"1")+",1 "+d*g+","+d*o+"L"+f*g+","+f*o+"A"+f+","+f+" 0 "+((n<Math.PI)?"0":"1")+",0 "+f*h+","+f*q+"Z"}else{c="M"+d*h+","+d*q+"A"+d+","+d+" 0 "+((n<Math.PI)?"0":"1")+",1 "+d*g+","+d*o+"L0,0Z"}}k=this.expect("path",k);k.setAttribute("fill-rule","evenodd");k.setAttribute("cursor",u.cursor);k.setAttribute("transform","translate("+u.left+","+u.top+")");k.setAttribute("d",c);k.setAttribute("fill",r.color);k.setAttribute("fill-opacity",r.opacity);k.setAttribute("stroke",t.color);k.setAttribute("stroke-opacity",t.opacity);k.setAttribute("stroke-width",u.lineWidth);k=this.append(k,b,j)}return k};pv.Mark=function(){this.$properties=[]};pv.Mark.prototype.properties={};pv.Mark.prototype.property=function(a){if(!this.hasOwnProperty("properties")){this.properties=pv.extend(this.properties)}this.properties[a]=true;pv.Mark.prototype[a]=function(b){if(arguments.length){this.$properties.push({name:a,type:(typeof b=="function")?3:2,value:b});return this}return this.scene[this.index][a]};return this};pv.Mark.prototype.property("data").property("visible").property("left").property("right").property("top").property("bottom").property("cursor").property("title").property("reverse");pv.Mark.prototype.childIndex=-1;pv.Mark.prototype.index=-1;pv.Mark.prototype.defaults=new pv.Mark().data(function(a){return[a]}).visible(true).reverse(false).cursor("").title("");var defaultFillStyle=pv.Colors.category20().by(pv.parent),defaultStrokeStyle=pv.Colors.category10().by(pv.parent);pv.Mark.prototype.extend=function(a){this.proto=a;return this};pv.Mark.prototype.add=function(a){return this.parent.add(a).extend(this)};pv.Mark.prototype.def=function(a,b){this.$properties.push({name:a,type:(typeof b=="function")?1:0,value:b});return this};pv.Mark.prototype.anchor=function(b){var a=new pv.Anchor().extend(this).name(b);a.parent=this.parent;return a};pv.Mark.prototype.anchorTarget=function(){var a=this;while(!(a instanceof pv.Anchor)){a=a.proto;if(!a){return null}}return a.proto};pv.Mark.prototype.first=function(){return this.scene[0]};pv.Mark.prototype.last=function(){return this.scene[this.scene.length-1]};pv.Mark.prototype.sibling=function(){return(this.index==0)?null:this.scene[this.index-1]};pv.Mark.prototype.cousin=function(){var b=this.parent,a=b&&b.sibling();return(a&&a.children)?a.children[this.childIndex][this.index]:null};pv.Mark.prototype.render=function(){this.bind();this.build();pv.Scene.updateAll(this.scene)};function argv(b){var a=[];while(b){a.push(b.scene[b.index].data);b=b.parent}return a}pv.Mark.prototype.bind=function(){var a={},l=[[],[],[],[]],k,f;function n(r){do{var o=r.$properties;for(var d=o.length-1;d>=0;d--){var q=o[d];if(!(q.name in a)){a[q.name]=1;switch(q.name){case"data":k=q;break;case"visible":f=q;break;default:l[q.type].push(q);break}}}}while(r=r.proto)}function c(d){return function(o){var i=this.scene.defs;if(arguments.length){if(o==undefined){delete i.locked[d]}else{i.locked[d]=true}i.values[d]=o;return this}else{return i.values[d]}}}n(this);n(this.defaults);l[1].reverse();l[3].reverse();var g=this;do{for(var b in g.properties){if(!(b in a)){a[b]=1;l[2].push({name:b,type:2,value:null})}}}while(g=g.proto);var h=l[0].concat(l[1]);for(var j=0;j<h.length;j++){var m=h[j];this[m.name]=c(m.name)}this.binds={data:k,visible:f,defs:h,properties:pv.blend(l)}};pv.Mark.prototype.build=function(){var g=this.scene;if(!g){g=this.scene=[];g.mark=this;g.type=this.type;g.childIndex=this.childIndex;if(this.parent){g.parent=this.parent.scene;g.parentIndex=this.parent.index}}var j=this.root.scene.data;if(!j){this.root.scene.data=j=argv(this.parent)}if(this.binds.defs.length){var b=g.defs;if(!b){g.defs=b={values:{},locked:{}}}for(var f=0;f<this.binds.defs.length;f++){var h=this.binds.defs[f];if(!(h.name in b.locked)){var k=h.value;if(h.type==1){property=h.name;k=k.apply(this,j)}b.values[h.name]=k}}}var c=this.binds.data;switch(c.type){case 0:case 1:c=b.values.data;break;case 2:c=c.value;break;case 3:property="data";c=c.value.apply(this,j);break}j.unshift(null);g.length=c.length;for(var f=0;f<c.length;f++){pv.Mark.prototype.index=this.index=f;var l=g[f];if(!l){g[f]=l={}}l.data=j[0]=c[f];var a=this.binds.visible;switch(a.type){case 0:case 1:a=b.values.visible;break;case 2:a=a.value;break;case 3:property="visible";a=a.value.apply(this,j);break}if(l.visible=a){this.buildInstance(l)}}j.shift();delete this.index;pv.Mark.prototype.index=-1;if(!this.parent){g.data=null}return this};pv.Mark.prototype.buildProperties=function(d,c){for(var b=0,g=c.length;b<g;b++){var f=c[b],a=f.value;switch(f.type){case 0:case 1:a=this.scene.defs.values[f.name];break;case 3:property=f.name;a=a.apply(this,this.root.scene.data);break}d[f.name]=a}};pv.Mark.prototype.buildInstance=function(a){this.buildProperties(a,this.binds.properties);this.buildImplied(a)};pv.Mark.prototype.buildImplied=function(n){var f=n.left;var a=n.right;var m=n.top;var i=n.bottom;var d=this.properties;var j=d.width?n.width:0;var g=d.height?n.height:0;var c=this.parent?this.parent.width():(j+f+a);if(j==null){j=c-(a=a||0)-(f=f||0)}else{if(a==null){a=c-j-(f=f||0)}else{if(f==null){f=c-j-(a=a||0)}}}var k=this.parent?this.parent.height():(g+m+i);if(g==null){g=k-(m=m||0)-(i=i||0)}else{if(i==null){i=k-g-(m=m||0)}else{if(m==null){m=k-g-(i=i||0)}}}n.left=f;n.right=a;n.top=m;n.bottom=i;if(d.width){n.width=j}if(d.height){n.height=g}};var property;var pageX=0,pageY=0;pv.listen(window,"mousemove",function(a){pageX=a.pageX;pageY=a.pageY});pv.Mark.prototype.mouse=function(){var a=0,d=0,c=(this instanceof pv.Panel)?this:this.parent;do{a+=c.left();d+=c.top()}while(c=c.parent);var b=this.root.canvas();do{a+=b.offsetLeft;d+=b.offsetTop}while(b=b.offsetParent);return pv.vector(pageX-a,pageY-d)};pv.Mark.prototype.event=function(b,a){if(!this.$handlers){this.$handlers={}}this.$handlers[b]=a;return this};pv.Mark.prototype.dispatch=function(d,a,c){var b=this.$handlers&&this.$handlers[d];if(!b){if(this.parent){this.parent.dispatch(d,a.parent,a.parentIndex)}return}try{var f=this;do{f.index=c;f.scene=a;c=a.parentIndex;a=a.parent}while(f=f.parent);try{f=b.apply(this,this.root.scene.data=argv(this))}finally{this.root.scene.data=null}if(f instanceof pv.Mark){f.render()}}finally{var f=this;do{if(f.parent){delete f.scene}delete f.index}while(f=f.parent)}};pv.Anchor=function(){pv.Mark.call(this)};pv.Anchor.prototype=pv.extend(pv.Mark).property("name");pv.Area=function(){pv.Mark.call(this)};pv.Area.prototype=pv.extend(pv.Mark).property("width").property("height").property("lineWidth").property("strokeStyle").property("fillStyle").property("segmented").property("interpolate");pv.Area.prototype.type="area";pv.Area.prototype.defaults=new pv.Area().extend(pv.Mark.prototype.defaults).lineWidth(1.5).fillStyle(defaultFillStyle).interpolate("linear");pv.Area.prototype.anchor=function(a){var b=this;return pv.Mark.prototype.anchor.call(this,a).left(function(){switch(this.name()){case"bottom":case"top":case"center":return b.left()+b.width()/2;case"right":return b.left()+b.width()}return null}).right(function(){switch(this.name()){case"bottom":case"top":case"center":return b.right()+b.width()/2;case"left":return b.right()+b.width()}return null}).top(function(){switch(this.name()){case"left":case"right":case"center":return b.top()+b.height()/2;case"bottom":return b.top()+b.height()}return null}).bottom(function(){switch(this.name()){case"left":case"right":case"center":return b.bottom()+b.height()/2;case"top":return b.bottom()+b.height()}return null}).textAlign(function(){switch(this.name()){case"bottom":case"top":case"center":return"center";case"right":return"right"}return"left"}).textBaseline(function(){switch(this.name()){case"right":case"left":case"center":return"middle";case"top":return"top"}return"bottom"})};pv.Area.prototype.buildImplied=function(a){if(a.height==null){a.height=0}if(a.width==null){a.width=0}pv.Mark.prototype.buildImplied.call(this,a)};var pv_Area_specials={left:1,top:1,right:1,bottom:1,width:1,height:1,name:1};pv.Area.prototype.bind=function(){pv.Mark.prototype.bind.call(this);var d=this.binds,c=d.properties,a=d.specials=[];for(var b=0,g=c.length;b<g;b++){var f=c[b];if(f.name in pv_Area_specials){a.push(f)}}};pv.Area.prototype.buildInstance=function(a){if(this.index&&!this.scene[0].segmented){this.buildProperties(a,this.binds.specials);this.buildImplied(a)}else{pv.Mark.prototype.buildInstance.call(this,a)}};pv.Bar=function(){pv.Mark.call(this)};pv.Bar.prototype=pv.extend(pv.Mark).property("width").property("height").property("lineWidth").property("strokeStyle").property("fillStyle");pv.Bar.prototype.type="bar";pv.Bar.prototype.defaults=new pv.Bar().extend(pv.Mark.prototype.defaults).lineWidth(1.5).fillStyle(defaultFillStyle);pv.Bar.prototype.anchor=function(a){var b=this;return pv.Mark.prototype.anchor.call(this,a).left(function(){switch(this.name()){case"bottom":case"top":case"center":return b.left()+(this.properties.width?0:(b.width()/2));case"right":return b.left()+b.width()}return null}).right(function(){switch(this.name()){case"bottom":case"top":case"center":return b.right()+(this.properties.width?0:(b.width()/2));case"left":return b.right()+b.width()}return null}).top(function(){switch(this.name()){case"left":case"right":case"center":return b.top()+(this.properties.height?0:(b.height()/2));case"bottom":return b.top()+b.height()}return null}).bottom(function(){switch(this.name()){case"left":case"right":case"center":return b.bottom()+(this.properties.height?0:(b.height()/2));case"top":return b.bottom()+b.height()}return null}).textAlign(function(){switch(this.name()){case"bottom":case"top":case"center":return"center";case"right":return"right"}return"left"}).textBaseline(function(){switch(this.name()){case"right":case"left":case"center":return"middle";case"top":return"top"}return"bottom"})};pv.Dot=function(){pv.Mark.call(this)};pv.Dot.prototype=pv.extend(pv.Mark).property("size").property("shape").property("angle").property("lineWidth").property("strokeStyle").property("fillStyle");pv.Dot.prototype.type="dot";pv.Dot.prototype.defaults=new pv.Dot().extend(pv.Mark.prototype.defaults).size(20).shape("circle").lineWidth(1.5).strokeStyle(defaultStrokeStyle);pv.Dot.prototype.anchor=function(b){var a=this;return pv.Mark.prototype.anchor.call(this,b).left(function(c){switch(this.name()){case"bottom":case"top":case"center":return a.left();case"right":return a.left()+a.radius()}return null}).right(function(c){switch(this.name()){case"bottom":case"top":case"center":return a.right();case"left":return a.right()+a.radius()}return null}).top(function(c){switch(this.name()){case"left":case"right":case"center":return a.top();case"bottom":return a.top()+a.radius()}return null}).bottom(function(c){switch(this.name()){case"left":case"right":case"center":return a.bottom();case"top":return a.bottom()+a.radius()}return null}).textAlign(function(c){switch(this.name()){case"left":return"right";case"bottom":case"top":case"center":return"center"}return"left"}).textBaseline(function(c){switch(this.name()){case"right":case"left":case"center":return"middle";case"bottom":return"top"}return"bottom"})};pv.Dot.prototype.radius=function(){return Math.sqrt(this.size())};pv.Label=function(){pv.Mark.call(this)};pv.Label.prototype=pv.extend(pv.Mark).property("text").property("font").property("textAngle").property("textStyle").property("textAlign").property("textBaseline").property("textMargin").property("textShadow");pv.Label.prototype.type="label";pv.Label.prototype.defaults=new pv.Label().extend(pv.Mark.prototype.defaults).text(pv.identity).font("10px sans-serif").textAngle(0).textStyle("black").textAlign("left").textBaseline("bottom").textMargin(3);pv.Line=function(){pv.Mark.call(this)};pv.Line.prototype=pv.extend(pv.Mark).property("lineWidth").property("strokeStyle").property("fillStyle").property("segmented").property("interpolate");pv.Line.prototype.type="line";pv.Line.prototype.defaults=new pv.Line().extend(pv.Mark.prototype.defaults).lineWidth(1.5).strokeStyle(defaultStrokeStyle).interpolate("linear");var pv_Line_specials={left:1,top:1,right:1,bottom:1,name:1};pv.Line.prototype.bind=function(){pv.Mark.prototype.bind.call(this);var d=this.binds,c=d.properties,a=d.specials=[];for(var b=0,g=c.length;b<g;b++){var f=c[b];if(f.name in pv_Line_specials){a.push(f)}}};pv.Line.prototype.buildInstance=function(a){if(this.index&&!this.scene[0].segmented){this.buildProperties(a,this.binds.specials);this.buildImplied(a)}else{pv.Mark.prototype.buildInstance.call(this,a)}};pv.Rule=function(){pv.Mark.call(this)};pv.Rule.prototype=pv.extend(pv.Mark).property("width").property("height").property("lineWidth").property("strokeStyle");pv.Rule.prototype.type="rule";pv.Rule.prototype.defaults=new pv.Rule().extend(pv.Mark.prototype.defaults).lineWidth(1).strokeStyle("black");pv.Rule.prototype.anchor=function(a){return pv.Bar.prototype.anchor.call(this,a).textAlign(function(b){switch(this.name()){case"left":return"right";case"bottom":case"top":case"center":return"center";case"right":return"left"}}).textBaseline(function(b){switch(this.name()){case"right":case"left":case"center":return"middle";case"top":return"bottom";case"bottom":return"top"}})};pv.Rule.prototype.buildImplied=function(f){var c=f.left,g=f.right,d=f.top,a=f.bottom;if((f.width!=null)||((c==null)&&(g==null))||((g!=null)&&(c!=null))){f.height=0}else{f.width=0}pv.Mark.prototype.buildImplied.call(this,f)};pv.Panel=function(){pv.Bar.call(this);this.children=[];this.root=this;this.$dom=pv.Panel.$dom};pv.Panel.prototype=pv.extend(pv.Bar).property("canvas").property("overflow");pv.Panel.prototype.type="panel";pv.Panel.prototype.defaults=new pv.Panel().extend(pv.Bar.prototype.defaults).fillStyle(null).overflow("visible");pv.Panel.prototype.anchor=function(b){function c(){return 0}c.prototype=this;c.prototype.left=c.prototype.right=c.prototype.top=c.prototype.bottom=c;var a=pv.Bar.prototype.anchor.call(new c(),b).data(function(f){return[f]});a.parent=this;return a};pv.Panel.prototype.add=function(a){var b=new a();b.parent=this;b.root=this.root;b.childIndex=this.children.length;this.children.push(b);return b};pv.Panel.prototype.bind=function(){pv.Mark.prototype.bind.call(this);for(var a=0;a<this.children.length;a++){this.children[a].bind()}};pv.Panel.prototype.buildInstance=function(b){pv.Bar.prototype.buildInstance.call(this,b);if(!b.children){b.children=[]}for(var a=0;a<this.children.length;a++){this.children[a].scene=b.children[a];this.children[a].build()}for(var a=0;a<this.children.length;a++){b.children[a]=this.children[a].scene;delete this.children[a].scene}b.children.length=this.children.length};pv.Panel.prototype.buildImplied=function(d){if(!this.parent){var g=d.canvas;if(g){if(typeof g=="string"){g=document.getElementById(g)}if(g.$panel!=this){g.$panel=this;g.innerHTML=""}var a,b;if(d.width==null){a=parseFloat(pv.css(g,"width"));d.width=a-d.left-d.right}if(d.height==null){b=parseFloat(pv.css(g,"height"));d.height=b-d.top-d.bottom}}else{if(d.$canvas){g=d.$canvas}else{function f(){var c=document.body;while(c.lastChild&&c.lastChild.tagName){c=c.lastChild}return(c==document.body)?c:c.parentNode}g=d.$canvas=document.createElement("span");this.$dom?this.$dom.parentNode.insertBefore(g,this.$dom):f().appendChild(g)}}d.canvas=g}pv.Bar.prototype.buildImplied.call(this,d)};pv.Image=function(){pv.Bar.call(this)};pv.Image.prototype=pv.extend(pv.Bar).property("url");pv.Image.prototype.type="image";pv.Image.prototype.defaults=new pv.Image().extend(pv.Bar.prototype.defaults).fillStyle(null);pv.Wedge=function(){pv.Mark.call(this)};pv.Wedge.prototype=pv.extend(pv.Mark).property("startAngle").property("endAngle").property("angle").property("innerRadius").property("outerRadius").property("lineWidth").property("strokeStyle").property("fillStyle");pv.Wedge.prototype.type="wedge";pv.Wedge.prototype.defaults=new pv.Wedge().extend(pv.Mark.prototype.defaults).startAngle(function(){var a=this.sibling();return a?a.endAngle:-Math.PI/2}).innerRadius(0).lineWidth(1.5).strokeStyle(null).fillStyle(defaultFillStyle.by(pv.index));pv.Wedge.prototype.midRadius=function(){return(this.innerRadius()+this.outerRadius())/2};pv.Wedge.prototype.midAngle=function(){return(this.startAngle()+this.endAngle())/2};pv.Wedge.prototype.anchor=function(b){var a=this;return pv.Mark.prototype.anchor.call(this,b).left(function(){switch(this.name()){case"outer":return a.left()+a.outerRadius()*Math.cos(a.midAngle());case"inner":return a.left()+a.innerRadius()*Math.cos(a.midAngle());case"start":return a.left()+a.midRadius()*Math.cos(a.startAngle());case"center":return a.left()+a.midRadius()*Math.cos(a.midAngle());case"end":return a.left()+a.midRadius()*Math.cos(a.endAngle())}}).right(function(){switch(this.name()){case"outer":return a.right()+a.outerRadius()*Math.cos(a.midAngle());case"inner":return a.right()+a.innerRadius()*Math.cos(a.midAngle());case"start":return a.right()+a.midRadius()*Math.cos(a.startAngle());case"center":return a.right()+a.midRadius()*Math.cos(a.midAngle());case"end":return a.right()+a.midRadius()*Math.cos(a.endAngle())}}).top(function(){switch(this.name()){case"outer":return a.top()+a.outerRadius()*Math.sin(a.midAngle());case"inner":return a.top()+a.innerRadius()*Math.sin(a.midAngle());case"start":return a.top()+a.midRadius()*Math.sin(a.startAngle());case"center":return a.top()+a.midRadius()*Math.sin(a.midAngle());case"end":return a.top()+a.midRadius()*Math.sin(a.endAngle())}}).bottom(function(){switch(this.name()){case"outer":return a.bottom()+a.outerRadius()*Math.sin(a.midAngle());case"inner":return a.bottom()+a.innerRadius()*Math.sin(a.midAngle());case"start":return a.bottom()+a.midRadius()*Math.sin(a.startAngle());case"center":return a.bottom()+a.midRadius()*Math.sin(a.midAngle());case"end":return a.bottom()+a.midRadius()*Math.sin(a.endAngle())}}).textAlign(function(){switch(this.name()){case"outer":return pv.Wedge.upright(a.midAngle())?"right":"left";case"inner":return pv.Wedge.upright(a.midAngle())?"left":"right"}return"center"}).textBaseline(function(){switch(this.name()){case"start":return pv.Wedge.upright(a.startAngle())?"top":"bottom";case"end":return pv.Wedge.upright(a.endAngle())?"bottom":"top"}return"middle"}).textAngle(function(){var c=0;switch(this.name()){case"center":case"inner":case"outer":c=a.midAngle();break;case"start":c=a.startAngle();break;case"end":c=a.endAngle();break}return pv.Wedge.upright(c)?c:(c+Math.PI)})};pv.Wedge.upright=function(a){a=a%(2*Math.PI);a=(a<0)?(2*Math.PI+a):a;return(a<Math.PI/2)||(a>3*Math.PI/2)};pv.Wedge.prototype.buildImplied=function(a){pv.Mark.prototype.buildImplied.call(this,a);if(a.endAngle==null){a.endAngle=a.startAngle+a.angle}if(a.angle==null){a.angle=a.endAngle-a.startAngle}};pv.Layout={};pv.Layout.grid=function(d){var c=d.length,f=d[0].length;function a(){return this.parent.width()/f}function b(){return this.parent.height()/c}return new pv.Mark().data(pv.blend(d)).left(function(){return a.call(this)*(this.index%f)}).top(function(){return b.call(this)*Math.floor(this.index/f)}).width(a).height(b)};pv.Layout.stack=function(){var b=function(){return 0};function a(){var d=this.parent.index,f,g;while((d-->0)&&!g){f=this.parent.scene[d];if(f.visible){g=f.children[this.childIndex][this.index]}}if(g){switch(property){case"bottom":return g.bottom+g.height;case"top":return g.top+g.height;case"left":return g.left+g.width;case"right":return g.right+g.width}}return b.apply(this,arguments)}a.offset=function(c){b=(c instanceof Function)?c:function(){return c};return this};return a};pv.Layout.icicle=function(l){var j=[],c=Number;function k(p){var o={size:0,children:[],keys:j.slice()};for(var n in p){var q=p[n],m=c(q);j.push(n);if(isNaN(m)){q=k(q)}else{q={size:m,data:q,keys:j.slice()}}o.children.push(q);o.size+=q.size;j.pop()}o.children.sort(function(s,r){return r.size-s.size});return o}function d(o,m){o.size*=m;if(o.children){for(var n=0;n<o.children.length;n++){d(o.children[n],m)}}}function h(n,m){m=m?(m+1):1;return n.children?pv.max(n.children,function(o){return h(o,m)}):m}function i(n){if(n.children){b(n);for(var m=0;m<n.children.length;m++){i(n.children[m])}}}function b(o){var p=o.left;for(var m=0;m<o.children.length;m++){var q=o.children[m],n=(q.size/o.size)*o.width;q.left=p;q.top=o.top+o.height;q.width=n;q.height=o.height;q.depth=o.depth+1;p+=n;if(q.children){b(q)}}}function a(n,o){if(n.children){for(var m=0;m<n.children.length;m++){a(n.children[m],o)}}o.push(n);return o}function g(){var m=k(l);m.top=0;m.left=0;m.width=this.parent.width();m.height=this.parent.height()/h(m);m.depth=0;i(m);return a(m,[]).reverse()}var f=new pv.Mark().data(g).left(function(m){return m.left}).top(function(m){return m.top}).width(function(m){return m.width}).height(function(m){return m.height});f.root=function(m){j=[m];return this};f.size=function(m){c=m;return this};return f};pv.Layout.sunburst=function(p){var n=[],d=Number,m,k,c;function o(s){var r={size:0,children:[],keys:n.slice()};for(var q in s){var t=s[q],h=d(t);n.push(q);if(isNaN(h)){t=o(t)}else{t={size:h,data:t,keys:n.slice()}}r.children.push(t);r.size+=t.size;n.pop()}r.children.sort(function(v,u){return u.size-v.size});return r}function f(r,h){r.size*=h;if(r.children){for(var q=0;q<r.children.length;q++){f(r.children[q],h)}}}function j(q,h){h=h?(h+1):1;return q.children?pv.max(q.children,function(r){return j(r,h)}):h}function l(q){if(q.children){b(q);for(var h=0;h<q.children.length;h++){l(q.children[h])}}}function b(r){var q=r.startAngle;for(var h=0;h<r.children.length;h++){var t=r.children[h],s=(t.size/r.size)*r.angle;t.startAngle=q;t.angle=s;t.endAngle=q+s;t.depth=r.depth+1;t.left=m/2;t.top=k/2;t.innerRadius=Math.max(0,t.depth-0.5)*c;t.outerRadius=(t.depth+0.5)*c;q+=s;if(t.children){b(t)}}}function a(q,r){if(q.children){for(var h=0;h<q.children.length;h++){a(q.children[h],r)}}r.push(q);return r}function i(){var h=o(p);m=this.parent.width();k=this.parent.height();c=Math.min(m,k)/2/(j(h)-0.5);h.left=m/2;h.top=k/2;h.startAngle=0;h.angle=2*Math.PI;h.endAngle=2*Math.PI;h.innerRadius=0;h.outerRadius=c;h.depth=0;l(h);return a(h,[]).reverse()}var g=new pv.Mark().data(i).left(function(h){return h.left}).top(function(h){return h.top}).startAngle(function(h){return h.startAngle}).angle(function(h){return h.angle}).innerRadius(function(h){return h.innerRadius}).outerRadius(function(h){return h.outerRadius});g.root=function(h){n=[h];return this};g.size=function(h){d=h;return this};return g};pv.Layout.treemap=function(o){var k=[],l,n,c=Number;function b(p){return l?Math.round(p):p}function m(s){var r={size:0,children:[],keys:k.slice()};for(var q in s){var t=s[q],p=c(t);k.push(q);if(isNaN(p)){t=m(t)}else{t={size:p,data:t,keys:k.slice()}}r.children.push(t);r.size+=t.size;k.pop()}r.children.sort(function(v,u){return v.size-u.size});return r}function d(r,p){r.size*=p;if(r.children){for(var q=0;q<r.children.length;q++){d(r.children[q],p)}}}function j(w,p){var x=-Infinity,q=Infinity,u=0;for(var t=0;t<w.length;t++){var v=w[t].size;if(v<q){q=v}if(v>x){x=v}u+=v}u=u*u;p=p*p;return Math.max(p*x/u,u/(p*q))}function h(r){var E=[],A=Infinity;var C=r.left+(n?n.left:0),B=r.top+(n?n.top:0),D=r.width-(n?n.left+n.right:0),z=r.height-(n?n.top+n.bottom:0),s=Math.min(D,z);d(r,D*z/r.size);function v(H){var F=pv.sum(H,function(J){return J.size}),y=(s==0)?0:b(F/s);for(var x=0,G=0;x<H.length;x++){var I=H[x],w=b(I.size/y);if(D==s){I.left=C+G;I.top=B;I.width=w;I.height=y}else{I.left=C;I.top=B+G;I.width=y;I.height=w}G+=w}if(D==s){if(I){I.width+=D-G}B+=y;z-=y}else{if(I){I.height+=z-G}C+=y;D-=y}s=Math.min(D,z)}var q=r.children.slice();while(q.length>0){var p=q[q.length-1];if(p.size<=0){q.pop();continue}E.push(p);var t=j(E,s);if(t<=A){q.pop();A=t}else{E.pop();v(E);E.length=0;A=Infinity}}if(E.length>0){v(E)}if(D==s){for(var u=0;u<E.length;u++){E[u].width+=D}}else{for(var u=0;u<E.length;u++){E[u].height+=z}}}function i(q){if(q.children){h(q);for(var p=0;p<q.children.length;p++){var r=q.children[p];r.depth=q.depth+1;i(r)}}}function a(q,r){if(q.children){for(var p=0;p<q.children.length;p++){a(q.children[p],r)}}if(n||!q.children){r.push(q)}return r}function g(){var p=m(o);p.left=0;p.top=0;p.width=this.parent.width();p.height=this.parent.height();p.depth=0;i(p);return a(p,[]).reverse()}var f=new pv.Mark().data(g).left(function(p){return p.left}).top(function(p){return p.top}).width(function(p){return p.width}).height(function(p){return p.height});f.round=function(p){l=p;return this};f.inset=function(s,q,p,r){if(arguments.length==1){q=p=r=s}n={top:s,right:q,bottom:p,left:r};return this};f.root=function(p){k=[p];return this};f.size=function(p){c=p;return this};return f}; return pv;}();pv.listen(window,"load",function(){var scripts=document.getElementsByTagName("script");for(var i=0;i<scripts.length;i++){var s=scripts[i];if(s.type=="text/javascript+protovis"){try{pv.Panel.$dom=s;window.eval(pv.parse(s.textContent||s.innerHTML))}catch(e){pv.error(e)}delete pv.Panel.$dom}}});var bibtexify = (function($) {
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
            'unpublished': 'Unpublished'},
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
        bibtex = new BibTex();
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
        $pubTable.dataTable({ 'aaData': bibentries, 
                              'aaSorting': options.sorting, 
                              'aoColumns': [ { "sTitle": "Year" },
                                             { "sTitle": "Type", "sType": "type-sort", "asSorting": [ "desc", "asc" ] },
                                             { "sTitle": "Publication" }],
                              'bPaginate': false
                            });
        if (options.protovis) {
            addProtovis();
        }
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