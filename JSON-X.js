// Electros JSON extension
/*
const formatMessage = require('format-message');
const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');
const Cast = require('../../util/cast');
*/
class JSONX {
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



