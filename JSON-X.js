// Electros JSON extension

const formatMessage = require('format-message');
const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');
const Cast = require('../../util/cast');

const icon = "data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='317.61173' height='336.51742' viewBox='0,0,317.61173,336.51742'%3E%3Cg transform='translate(-89.54157,3.9139)'%3E%3Cg data-paper-data='%7B&quot;isPaintingLayer&quot;:true%7D' fill-rule='nonzero' stroke-dasharray='' stroke-dashoffset='0' style='mix-blend-mode: normal'%3E%3Cpath d='M385.52804,232.3679c-18.1111,115.13253 -110.22209,100.23867 -199.30013,89.93689c-89.07803,-10.30178 -105.7696,-39.00865 -87.7784,-120.15569c17.99119,-81.14704 75.65419,-139.43685 168.36185,-137.42357c92.70766,2.0133 136.82778,52.50981 118.71668,167.64237z' fill='%23f7aa32' stroke='none' stroke-width='1.99937' stroke-linecap='round' stroke-linejoin='round' stroke-miterlimit='10'/%3E%3Cpath d='M347.39478,298.56145c20.19613,19.27598 -71.21112,46.90954 -167.64235,27.34081c-96.43125,-19.56873 -92.81868,-63.47147 -88.49791,-85.61994c4.32078,-22.14845 76.99304,-44.79057 138.86255,-27.34079c61.86952,17.44976 82.07302,59.13266 117.2777,85.61992z' fill='%23fbede4' stroke='none' stroke-width='1.99937' stroke-linecap='round' stroke-linejoin='round' stroke-miterlimit='10'/%3E%3Cpath d='M178.25554,154.92661c-1.52485,12.62396 -10.11627,22.56351 -21.22963,22.0285c-11.11338,-0.53499 -22.37658,-11.70243 -19.01549,-23.96591c3.73071,-13.61204 14.83991,-20.69263 21.22963,-22.02852c15.90269,-3.32472 20.71534,9.89291 19.01549,23.96591z' fill='%232c2c2b' stroke='none' stroke-width='1.99937' stroke-linecap='round' stroke-linejoin='round' stroke-miterlimit='10'/%3E%3Cpath d='M212.81606,209.44352c-1.85692,12.57941 -9.55549,20.7659 -22.2712,20.7659c-12.71572,0 -22.73073,-10.3115 -23.02384,-23.02384c-0.27454,-11.90665 10.96367,-21.05718 23.67938,-21.05718c12.71572,0 23.08052,13.39152 21.61564,23.31515z' fill='%232c2c2b' stroke='none' stroke-width='1.99937' stroke-linecap='round' stroke-linejoin='round' stroke-miterlimit='10'/%3E%3Cpath d='M224.36115,242.44085c-18.51671,1.93399 -40.42222,10.18475 -36.69425,-20.86535c-8.01216,26.27727 -20.93921,19.55223 -32.37728,16.54838' fill='none' stroke='%232c2c2b' stroke-width='12' stroke-linecap='round' stroke-linejoin='round' stroke-miterlimit='4'/%3E%3Cpath d='M264.33676,163.52421c-1.52485,12.62396 -10.11627,22.56351 -21.22963,22.0285c-11.11338,-0.53499 -22.37658,-11.70243 -19.01549,-23.96591c3.73071,-13.61204 14.83991,-20.69263 21.22963,-22.02852c15.90269,-3.32472 20.71534,9.89291 19.01549,23.96591z' fill='%232c2c2b' stroke='none' stroke-width='1.99937' stroke-linecap='round' stroke-linejoin='round' stroke-miterlimit='10'/%3E%3Cpath d='M250.33124,66.03688l-90.32227,34.09517c2.92391,-22.9295 16.99139,-65.61526 40.07678,-71.7793c23.08539,-6.16404 39.45593,18.76505 50.24551,37.68411z' fill='%23f7aa32' stroke='none' stroke-width='18' stroke-linecap='round' stroke-linejoin='round' stroke-miterlimit='4'/%3E%3Cpath d='M320.91424,73.81298c16.67649,-9.62325 37.99012,-29.35639 57.42344,-13.75769c19.43333,15.59867 11.00373,52.42941 5.38343,78.95722z' fill='%23f7aa32' stroke='none' stroke-width='18' stroke-linecap='round' stroke-linejoin='round' stroke-miterlimit='4'/%3E%3Cg stroke='none' stroke-width='1' stroke-linecap='butt' stroke-linejoin='miter' stroke-miterlimit='10'%3E%3Cpath d='M407.15331,145.93797l-7.81183,22.34009l-294.4823,-51.62432l7.81183,-22.34009l10.51681,1.84365c5.78439,1.01403 11.68923,-1.50744 13.12138,-5.60308l5.20784,-14.89326c14.06135,-40.21233 63.90174,-67.82965 119.34213,-69.96564l1.43215,-4.09564c1.30185,-3.72301 7.20611,-6.24459 12.46481,-5.32271l53.63776,9.40299c5.25812,0.92178 8.81942,5.10229 7.51743,8.8257l-1.43215,4.09564c47.49826,20.57672 72.86162,62.95824 58.80026,103.17057l-4.55691,13.03175c-1.43215,4.09564 2.12901,8.27655 7.9134,9.29059z' fill='%23f4ba48'/%3E%3Cg fill='%23b58024'%3E%3Cpath d='M348.00683,139.52094l-178.79332,-31.34342c-3.15533,-0.55315 -4.73792,-2.41116 -3.9567,-4.64529c0.78123,-2.23413 3.40536,-3.35469 6.56069,-2.80154l178.79274,31.34332c3.15533,0.55315 4.73792,2.41116 3.9567,4.64529c-0.78123,2.23413 -3.40536,3.35469 -6.56011,2.80164'/%3E%3Cpath d='M326.66792,40.9415c-3.15533,-0.55315 -4.73792,-2.41116 -3.9567,-4.64529l5.20784,-14.89326c0.78123,-2.23413 3.40536,-3.35469 6.56069,-2.80154c3.15533,0.55315 4.73792,2.41116 3.9567,4.64529l-5.20784,14.89326c-0.78123,2.23413 -3.40536,3.35469 -6.56069,2.80154'/%3E%3Cpath d='M253.04735,28.03542c-3.15533,-0.55315 -4.73792,-2.41116 -3.9567,-4.64529l5.20784,-14.89326c0.78123,-2.23413 3.40536,-3.35469 6.56069,-2.80154c3.15533,0.55315 4.73792,2.41116 3.9567,4.64529l-5.20784,14.89326c-0.78123,2.23413 -3.40536,3.35469 -6.56069,2.80154'/%3E%3Cpath d='M283.34766,53.10554c-3.15533,-0.55315 -4.73792,-2.41116 -3.9567,-4.64529l15.62366,-44.68018c0.78123,-2.23413 3.40536,-3.35469 6.56069,-2.80154c3.15533,0.55315 4.73792,2.41116 3.9567,4.64529l-15.62366,44.68018c-0.65093,1.8615 -3.40536,3.35469 -6.56069,2.80154'/%3E%3Cpath d='M360.80815,34.2814c13.30225,9.84024 23.06362,21.82544 29.1489,34.74678v0l-63.18813,3.54389l34.03923,-38.29068z'/%3E%3Cpath d='M227.23972,10.86614l4.87499,45.11255l-53.55354,-24.0089v0c13.8971,-9.41875 30.42863,-16.79467 48.67854,-21.10365z'/%3E%3C/g%3E%3Cg fill='none' font-family='sans-serif' font-weight='normal' font-size='12' text-anchor='start'/%3E%3Cg fill='none' font-family='sans-serif' font-weight='normal' font-size='12' text-anchor='start'/%3E%3Cg fill='none' font-family='sans-serif' font-weight='normal' font-size='12' text-anchor='start'/%3E%3Cg fill='none' font-family='sans-serif' font-weight='normal' font-size='12' text-anchor='start'/%3E%3Cg fill='none' font-family='sans-serif' font-weight='normal' font-size='12' text-anchor='start'/%3E%3Cg fill='none' font-family='sans-serif' font-weight='normal' font-size='12' text-anchor='start'/%3E%3Cg fill='none' font-family='sans-serif' font-weight='normal' font-size='12' text-anchor='start'/%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E"

/**
 * @constructor
 */

class JSONX {
    constructor (runtime) {
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */
        this.runtime = runtime;
    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo () {
        return {
            id: 'json',
            name: 'JSON-X',
            blockIconURI: icon,
            menuIconURI: icon,
            docsURI: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            color1: '#ff964c',
            color2: '#fd8a5e',
            blocks: [
                {
                    opcode: 'parseJSON',
                    text: formatMessage({
                        id: 'sn.blocks.parseJSON',
                        default: '[path] of [json]',
                        description: 'Returns the specified value of a JSON'
                    }),
                    disableMonitor: true,
                    blockType: BlockType.REPORTER
                },
                
            ],
            menus: {
            }
        };
    }

    parseJSON({
		PATH,
		JSON_STRING
	}) {
		try {
			const path = PATH.toString().split('/').map(prop => decodeURIComponent(prop));
			if (path[0] === '') path.splice(0, 1);
			if (path[path.length - 1] === '') path.splice(-1, 1);
			let json;
			try {
				json = JSON.parse(' ' + JSON_STRING);
			} catch (e) {
				return e.message;
			}
			path.forEach(prop => json = json[prop]);
			if (json === null) return 'null';
			else if (json === undefined) return '';
			else if (typeof json === 'object') return JSON.stringify(json);
			else return json.toString();
		} catch (err) {
			return 'Try Failed';
		}
	};

}

Scratch.extensions.register(new JSONX());



