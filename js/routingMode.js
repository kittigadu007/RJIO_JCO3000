/*
 * File: routingMode.js
 * Created on 29th Oct 2012 - Bala Krishna G
 * Modified on 9th Nov 2012 - Laxmi
 * Copyright (c) 2012 TeamF1, Inc.
 * All rights reserved.
 */
/****
 * Routing Mode Selection
 * @method showWarning
 * @param opflag - routingMode Radio button name
 */
function showWarning(opFlag){
    var selValue = radioCheckedValueGet(opFlag);
    if (!selValue) 
        return;
    switch (parseInt(selValue, 10)) {
        case 1: /* NAT */
            if (confirm('Enabling \'NAT\' will revert all port forwarding firewall settings to defaults.\nAre you sure you want to enable \'NAT\'?', '')) 
                return true;
            else {
                document.getElementById('tf1_classical').checked = true;
                return false;
            }
            break;
            
        case 2: /* Classical Routing */
            if (confirm('Enabling \'Classical Routing\' will revert all port forwarding firewall settings to defaults.\nAre you sure you want to enable \'Classical Routing\'?', '')) 
                return true;
            else {
                document.getElementById('tf1_NAT').checked = true;
                return false;
            }
            break;
    }
}


