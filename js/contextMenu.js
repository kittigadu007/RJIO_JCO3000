/*
 * ContextMenu - jQuery plugin for right-click context menus
 *
 * Author: Chris Domigan
 * Contributors: Dan G. Switzer, II
 * Parts of this plugin are inspired by Joern Zaefferer's Tooltip plugin
 *
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * Version: r2
 * Date: 16 July 2007
 *
 * For documentation visit http://www.trendskitchens.co.nz/jquery/contextmenu/
 *
 */
(function($){

    var menu, shadow, trigger, content, hash, currentTarget;
    var defaults = {
        menuStyle: {
            listStyle: 'none',
            padding: '1px',
            margin: '0px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #505970',
            width: 'auto'
        },
        itemStyle: {
            margin: '0px',
            color: '#373c4f',
            display: 'block',
            cursor: 'default',
            padding: '3px',
            border: 'none',
            backgroundColor: 'transparent'
        },
        itemHoverStyle: {
            border: '1px solid #0a246a',
            backgroundColor: '#b6bdd2'
        },
        eventPosX: 'pageX',
        eventPosY: 'pageY',
        shadow: true,
        onContextMenu: null,
        onShowMenu: null
    };
    
    $.fn.contextMenu = function(id, options){
        if (!menu) { // Create singleton menu
            menu = $('<div class="toolTip" id="jqContextMenu"></div>').hide().css({
                position: 'absolute',
                zIndex: '500'
            }).appendTo('body').bind('click', function(e){
                e.stopPropagation();
            });
        }
        if (!shadow) {
            shadow = $('<div></div>').css({
                backgroundColor: '#000',
                position: 'absolute',
                opacity: 0.2,
                zIndex: 499
            }).appendTo('body').hide();
        }
        hash = hash || [];
        hash.push({
            id: id,
            menuStyle: $.extend({}, defaults.menuStyle, options.menuStyle || {}),
            itemStyle: $.extend({}, defaults.itemStyle, options.itemStyle || {}),
            itemHoverStyle: $.extend({}, defaults.itemHoverStyle, options.itemHoverStyle || {}),
            bindings: options.bindings || {},
            shadow: options.shadow || options.shadow === false ? options.shadow : defaults.shadow,
            onContextMenu: options.onContextMenu || defaults.onContextMenu,
            onShowMenu: options.onShowMenu || defaults.onShowMenu,
            eventPosX: options.eventPosX || defaults.eventPosX,
            eventPosY: options.eventPosY || defaults.eventPosY
        });
        
        var index = hash.length - 1;
        $(this).bind('contextmenu', function(e){
            // Check if onContextMenu() defined
            var bShowContext = (!!hash[index].onContextMenu) ? hash[index].onContextMenu(e) : true;
            if (bShowContext) 
                display(index, this, e, options);
            return false;
        });
        return this;
    };
    
    function display(index, trigger, e, options){
        var cur = hash[index];
        content = $('#' + cur.id).find('ul:first').clone(true);
        
        //Following style is not needed, so commenting it out
        content.css(cur.menuStyle).find('li').css(cur.itemStyle).hover(function(){
            $(this).css(cur.itemHoverStyle);
        }, function(){
            $(this).css(cur.itemStyle);
        }).find('img').css({
            verticalAlign: 'middle',
            paddingRight: '2px'
        });
        
        // Send the content to the menu
        menu.html(content);
        setMenuIds();
        var rowId = returnTarget(e).parentNode.id;
        // if there's an onShowMenu, run it now -- must run after content has been added
        // if you try to alter the content variable before the menu.html(), IE6 has issues
        // updating the content
        if (!!cur.onShowMenu) 
            menu = cur.onShowMenu(e, menu, rowId);
        $.each(cur.bindings, function(id, func){
            $('#' + id, menu).bind('click', function(e){
                //don't hide context menu when selectAll item is clicked 
                if (id != "selectAll") {
                    hide();
                }
                func(trigger, currentTarget, rowId);
            });
        });
        
        /*Linux and Firefox issue with rightclick menus */
        var isFirefox = /Firefox/i.test(navigator.userAgent);
        var isUbuntu =  /Ubuntu/i.test(navigator.userAgent);
        var isLinux = /X11/i.test(navigator.userAgent);
        if (isFirefox && isLinux) {
             $(".toolTip").css("margin-left","-2px");
             $(".toolTip").css("margin-top","-2px");
        }
        /* getIEVersion coming from mis.js global variable -1 for non IE browsers */
        if(getIEVersion == -1) {
            var menuY = e['pageY'];
        } else {
            var menuY = e['clientY'] + document.documentElement.scrollTop;
        }
        if (e['clientY'] + menu.height() >= $( window ).height()) {
            menuY = menuY - menu.height();
            /*Linux and Firefox issue with rightclick menus */
            if (isFirefox && isLinux) {
                $(".toolTip").css("margin-top","2px");
            }
        }
        menu.css({'left':e[cur.eventPosX],'top':menuY}).show();
        $(document).one('click', hide);
    }
    
    function hide(){
        menu.hide();
        shadow.hide();
    }
    
    // Apply defaults
    $.contextMenu = {
        defaults: function(userDefaults){
            $.each(userDefaults, function(i, val){
                if (typeof val == 'object' && defaults[i]) {
                    $.extend(defaults[i], val);
                }
                else 
                    defaults[i] = val;
            });
        }
    };
    
})(jQuery);

$(function(){
    $('div.contextMenu').hide();
});
