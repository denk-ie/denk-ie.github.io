/* data route */
    // const url = "/api/neos";
    // d3.json(url).then(function(response) {

    // const data = response;

var des = [];
var orbit_id = [];
var jd = [];
var cd = [];
var dist = [];
var dist_min = [];
var dist_max = [];
var v_rel = [];
var v_inf = [];
var t_sigma_f = [];
var body = [];
var h = [];

$.getJSON("data/response.json").then((neodata) => {
    neodata.data.forEach(function(x) {
        des.push(x[0]);          
        orbit_id.push(x[1]);
        jd.push(x[2]);
        cd.push(x[3]);
        dist.push(x[4]);
        dist_min.push(x[5]);
        dist_max.push(x[6]);
        v_rel.push(x[7]);
        v_inf.push(x[8]);
        t_sigma_f.push(x[9]);
        body.push(x[10]);
        h.push(x[11]);
    })

// First visualisation
    var coords1 = v_rel.map((x, i) => ({ x, y: h[i] }));

    const data1 = {
        datasets: [{
            label: '',
            data: coords1,
            backgroundColor: 'rgb(252, 165, 3, 0.4)'
        }],
    };

    const config1 = {
        type: 'scatter',
        data: data1,
        options: {
            plugins: {
                legend: {
                    display: false
                    },
                title: {
                    display: true,
                    text: 'Velocity vs Magnitude'
                    }
                },
            scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                title: {
                    display: true,
                    text: 'Velocity (km/s)'
                    }
                },
            y: {
                title: {
                    display: true,
                    text: 'Magnitude (h)'
                    }
                }
                }
            }
        };

    const chart1 = new Chart(
        document.getElementById('chart1'),
        config1
        );
    })
// Second visualisation

var phades = [];
var phaorbit_id = [];
var phajd = [];
var phacd = [];
var phadist = [];
var phadist_min = [];
var phadist_max = [];
var phav_rel = [];
// var phav_inf = [];
// var phat_sigma_f = [];
// var phabody = [];
var phah = [];

$.getJSON("data/pha.json").then((phadata) => {
phadata.data.forEach(function(x) {
    phades.push(x[0]);          
    phaorbit_id.push(x[1]);
    phajd.push(x[2]);
    phacd.push(x[3]);
    phadist.push(x[4]);
    phadist_min.push(x[5]);
    phadist_max.push(x[6]);
    phav_rel.push(x[7]);
    // phav_inf.push(x[8]);
    // phat_sigma_f.push(x[9]);
    // phabody.push(x[10]);
    phah.push(x[11]);
})

const coords2 = phadist_min.map((x, j) => ({x, y: 0, r: 1.5*phah[j]}));

        // coords2.forEach(i => {
        //     if (i[0] > 0.05 || i[2] > 22.0) {
        //         delete coords2[i];
        //     }});
    
        const data2 = {
            datasets: [{
                label: 'Asteroids magnitude (h)',
                data: coords2,
                backgroundColor: 'rgb(70, 119, 184, 0.6)',
                borderWidth: 5
                }]
            };
    
            const zoomOptions = {
                limits: {
                  x: {min: -200, max: 200, minRange: 50},
                  y: {min: -1, max: 1, minRange: 10}
                },
                pan: {
                  enabled: true,
                  mode: 'xy',
                },
                zoom: {
                  wheel: {
                    enabled: true,
                  },
                  pinch: {
                    enabled: true
                  },
                  mode: 'xy',
                  onZoomComplete({chart}) {
                    // This update is needed to display up to date zoom level in the title.
                    // Without this, previous zoom level is displayed.
                    // The reason is: title uses the same beforeUpdate hook, and is evaluated before zoom.
                    chart.update('none');
                  }
                }
              };

        const config2 = {
            type: 'bubble',
            data: data2,
            options: {
                plugins: {
                    zoom: zoomOptions,
                    title: {
                        display: true,
                        text: 'Potentially hazardous asteroids (PHAs)'
                        }
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Distance (au)'
                                }
                            },
                        y: {
                            display: false,
                            }
                            }
            }
            };
            // Object.keys(scales).forEach(scale => Object.assign(scales[scale], scaleOpts));
        const chart2 = new Chart(
            document.getElementById('chart2'),
            config2
            )
    })

// Third visualisation

//     });
// }