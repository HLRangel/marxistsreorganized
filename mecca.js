function changeHostname(toChange, newHost) {
    let oldURL = new URL(toChange);
    
    oldURL.hostname = newHost;

    return oldURL.href;
}

/*  This is awful, however, time should be spent on an actually expedient
    solution based on finding redirects, rather than smartassing 
    link-wrangling...*/

function isExcluded(href, includes, excludedsubdirs) {
    for(subdir of excludedsubdirs) {
        if(href.includes(includes + subdir)) {
            return true;
        }
    }

    return false;
}

function fixLinks(newHost) {
    let exclusionObjects = [
        {
            includes: "/archive/marx/works/cw",
            excludedsubdirs: [
                "/index.htm"
            ]
        },

        {
            includes: "/archive/marx/letters/jenny",
            excludedsubdirs: [
                "/index.html",
                "/67_10_05a.htm"
            ]
        },

        {
            includes: "/archive/marx/letters/papa",
            excludedsubdirs: [
                "/index.html",
            ]
        },

        {
            includes: "/archive/marx/works/1837-pre",
            excludedsubdirs: [
                "/index.html",
                "/verse",
                "/letters/37_11_10.htm"
            ]
        },
        
        {
            includes: "/archive/marx/works/1839",
            excludedsubdirs: [
                "/index.htm",
                "/letters/39_01",
                "/letters/39_02",
                "/letters/39_03",
                "/letters/39_04",
                "/letters/39_05_23",
                "/02/24.htm",
                "/03/telegraph.htm",
                "/03/24.htm",
                "/04/27.htm",
                "/05/09.htm",
                "/05/telegraph.htm",
                "/11/elberfeld.htm",
                "/11/telegraph.htm",
                "/12/telegraph.htm"
            ]
        },

        {
            includes: "/archive/marx/works/1840",
            excludedsubdirs: [
                "/index.htm",
                "/letters/index.htm",
                "/02/telegraph.htm",
                "/02/platen.htm",
                "/04/printing.htm",
                "/04/jacoby.htm",
                "/04/requiem.htm",
                "/03/literary.htm",
                "/04/grun.htm",
                "/07/landscapes.htm",
                "/07/bremen.htm",
                "/08/evening.htm",
                "/08/bremen.htm",
                "/09/sermons.htm",
                "/10/10.htm",
                "/10/bremen.htm",
                "/11/sthelena.htm",
                "/12/siegfried.htm"
            ]
        },

        {
            includes: "/archive/marx/works/1841",
            excludedsubdirs: [
                "/index.htm",
                "/letters/index.htm",
                "/01/arndt.htm",
                "/01/night-ride.htm",
                "/02/emperors.htm",
                "/01/bremen.htm",
                "/04/immermann.htm",
                "/12/lombardy.htm"
            ]
        },

        {
            includes: "/archive/marx/works/1842",
            excludedsubdirs: [
                "/index.htm",
                "/letters/index.htm",
                "/02/10.htm",
                "/free-press/index.htm",
                "/08/29.htm",
                "/08/19.htm",
                "/10/16.htm"
            ]
        },

        {
            includes: "/archive/marx/works/1843",
            excludedsubdirs: [
                "/index.htm",
                "/letters/index.htm",
                "/critique-hpr",
                "/10/23.htm",
                "/11/18.htm",
                "/letters/43_03.htm",
                "/letters/43_05.htm",
                "/letters/43_09.htm",
                "/letters/43_12_10.htm"
            ]
        },

        {
            includes: "/archive/marx/works/1844",
            excludedsubdirs: [
                "/index.htm",
                "/letters/index.htm",
                "/james-mill/index.htm",
                "/manuscripts/index.htm",
                "/jewish-question",
                "/critique-hpr",
                "/df-jahrbucher",
                "/condition-england/index.htm",
                "/08/07.htm",
                "/01/13.htm",
                "/01/28.htm",
                "/01/30.htm",
                "/09/20.htm",
                "/11/09.htm",
                "/letters/44_10_01.htm",
                "/letters/44_12_30.htm"
            ]
        },

        {
            includes: "/archive/marx/works/1845",
            excludedsubdirs: [
                "/index.htm",
                "/letters/index.htm",
                "/condition-working-class",
                "/holy-family",
                "/theses/index.htm",
                "/german-ideology/index.htm",
                "/german-ideology/preface.htm",
                "/german-ideology/ch01",
                "/german-ideology/ch03",
                "/german-ideology/ch03abs.htm",
                "/german-ideology/ch04",
                "/german-ideology/abstract.htm",
                "/01/ricardo.htm",
            ]
        },

        {
            includes: "/archive/marx/works/1846",
            excludedsubdirs: [
                "/index.htm",
                "/letters/index.htm"
            ]
        },

        {
            includes: "/archive/marx/works/1847",
            excludedsubdirs: [
                "/index.htm",
                "/letters/index.htm",
                "/communist-league/index.htm",
                "/06/09.htm",
                "/poverty-philosophy",
                "/11/prin-com.htm",
                "/12/05.htm",
                "/wage-labour"
            ]
        },

        {
            includes: "/archive/marx/works/1848",
            excludedsubdirs: [
                "/index.htm",
                "/letters/index.htm",
                "/free-trade/index.htm",
                "/free-trade/free-trade.pdf",
                "/01/09ft.htm",
                "/08/01.htm",
                "/02/22a.htm",
                "/02/22.htm",
                "/03/24.htm",
                "/12/england-revolution.htm",
                "/06/29a.htm",
                "/07/01.htm",
                "/letters/48_12_29.htm",
                "/communist-manifesto"
            ]
        },

        {
            includes: "/archive/marx/works/1849",
            excludedsubdirs: [
                "/index.htm",
                "/letters/index.htm",
                "/two-political-trials/index.htm"
            ]
        },

        {
            includes: "/archive/marx/works/1850",
            excludedsubdirs: [
                "/index.htm",
                "/letters/index.htm",
                "/communist-league/1850-ad1.htm",
                "/class-struggles-france",
                "/peasant-war-germany",
                "/german-imperial/index.htm",
                "/02/english-revolution.htm"
            ]
        },

        {
            includes: "/archive/marx/works/1851",
            excludedsubdirs: [
                "/index.htm",
                "/letters/index.htm",
                "/letters/51_12_11.htm",
                "/letters/51_12_27.htm"
            ]
        },

        {
            includes: "/archive/marx/works/1852",
            excludedsubdirs: [
                "/index.htm",
                "/letters/index.htm",
                "/germany",
                "/18th-brumaire",
                "/heroes-exile",
                "/letters/52_01_16.htm",
                "/letters/52_03_05-ab.htm",
                "/letters/52_10_04.htm"
            ]
        },

        {
            includes: "/archive/marx/works/1853",
            excludedsubdirs: [
                "/index.htm",
                "/letters/index.htm",
                "/palmerston"
            ]
        },

        {
            includes: "/archive/marx/works/1854",
            excludedsubdirs: [
                "/index.htm",
                "/letters/index.htm"
            ]
        },

        {
            includes: "/archive/marx/works/1855",
            excludedsubdirs: [
                "/index.htm",
                "/letters/index.htm",
                "/06/25.htm",
                "/armies-europe/index.htm"
            ]
        },

        {
            includes: "/archive/marx/works/1856",
            excludedsubdirs: [
                "/index.htm",
                "/letters/index.htm"
            ]
        },

        {
            includes: "/archive/marx/works/1838/09/16.htm"
        }
    ]

    for(link of document.getElementsByTagName("A")) {
        for(object of exclusionObjects) {
            if(link.href.includes(object.includes) && 
            !isExcluded(link.href, object.includes, object.excludedsubdirs)) {
                link.href = changeHostname(link.href, newHost);
                link.style.color = "green";
                link.style.textDecoration = "underline";

                break;
            }
        }
    }
}

function goodResponse(response) {
    fixLinks(response.response)
}

function badResponse(badresponse) {
    console.log(`Unable to set mirror. Error: ${badresponse}`);

    fixLinks("marxists.architexturez.net");
}

function main() {
    browser.runtime.sendMessage(
        {
            text: "what"
        }
    ).then(goodResponse, badResponse);
}

main();

document.body.style.border = "5px solid red";


// Only use this stuff later


function isMissing() {
    // Any element of title class has paragraph with no longe available msg
    for(para of document.getElementsByClassName("title")) {
        if(para.tagName == "P") {
            if(para.innerText 
                == "Marxists Internet Archive: MECW File No Longer Available"
            ) {
                return true;
            }
        }
    }

    // First H3 of first DIV is the no longer available msg
    const divs = document.getElementsByTagName("div");
    var divh3;

    if( divs != null && 
        divs[0] != null && 
        (divh3 = divs[0].getElementsByTagName("h3")) != null &&
        divh3[0] != null &&
        divh3[0].innerText == "“File No Longer Available!”") {
            return true;
        }

    return false;
}

function redirectTo(chosenDomain) {
    let destination = new URL(`https://${chosenDomain}`);
    
    destination.pathname = window.location.pathname;
    destination.search = window.location.search;
    destination.hash = window.location.hash;

    window.location.href = destination.href;
}

function evaluateStatus(d) {
    if(isMissing()) {
        redirectTo("marxists.architexturez.net");
    }
}
