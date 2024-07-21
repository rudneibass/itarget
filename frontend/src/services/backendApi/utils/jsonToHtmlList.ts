type JsonValue = string | number | boolean | null | JsonObject | JsonArray;

interface JsonObject {
    [key: string]: JsonValue;
}
interface JsonArray extends Array<JsonValue> {}

export default function jsonToHtmlList(jsonString: string): string {
    let json: JsonValue;
    try {
        json = JSON.parse(jsonString) as JsonValue;
    } catch (e) {
        return `<li>Invalid JSON</li>`;
    }

    function parseJsonToHtml(json: JsonValue): string {
        if (typeof json !== 'object' || json === null) {
            return `<li style="list-style: none; padding-left: 15px;">${json}</li>`;
        }

        let html = '<ul style="list-style: none; padding: 0;">';
        if (Array.isArray(json)) {
            for (const item of json) {
                html += parseJsonToHtml(item);
            }
        } else {
            for (const key in json) {
                if (Object.prototype.hasOwnProperty.call(json, key)) {
                    html += `<li style="list-style: none; padding-left: 15px;">${key}: `;
                    html += parseJsonToHtml(json[key]);
                    html += '</li>';
                }
            }
        }
        html += '</ul>';

        return html;
    }

    return parseJsonToHtml(json);
}
