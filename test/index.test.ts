import { describe, it } from "mocha";
import { expect } from "chai";
import { RwTomlBuilder, RwTomlBuilderContext, RwTomlBuilderSource, RwTomlBuilderTarget } from "../src/builder/toml";
import { none } from "../src/util/optional";

describe('RwTomlBuilder', () => {
    it('builds single toml', () => {
        const context: RwTomlBuilderContext = {
            sources: [
                {
                    path: ['a', 'abc.toml'],
                    content: {
                        "core": {
                            "name": "az"
                        },
                        "projectile": {
                            "main": {
                                "image": "projectile_main.png"
                            }
                        }
                    },
                    from: none(),
                    to: none()
                }
            ],
            targets: []
        };
        const result = RwTomlBuilder({context, source: context.sources[0]});
        expect(result.isOk()).to.equal(true);
        const { target } = result.unwrap();
        expect(target.content['projectile_main'] == undefined).to.equal(false);
        expect(target.content['projectile_main']['image']).to.equal('projectile_main.png');
        expect(target.content['core'] == undefined).to.equal(false);
        expect(target.content['core']['name']).to.equal('az');
    });
});