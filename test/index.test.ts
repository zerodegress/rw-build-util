import { describe, it } from "mocha";
import { expect } from "chai";
import { rwTomlBuilder, RwTomlBuilder, RwTomlBuilderContext, RwTomlBuilderSource, RwTomlBuilderTarget, build, RwTomlConverterContext } from "../src/builder/toml";
import { none } from "../src/util/optional";

describe('/builder/toml rwTomlBuilder()', () => {
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
        const result = rwTomlBuilder({context, source: context.sources[0]});
        expect(result.isOk()).to.equal(true);
        const { target } = result.unwrap();
        expect(target.content['projectile_main'] == undefined).to.equal(false);
        expect(target.content['projectile_main']['image']).to.equal('projectile_main.png');
        expect(target.content['core'] == undefined).to.equal(false);
        expect(target.content['core']['name']).to.equal('az');
    });
});

describe('/builder/toml build()', () => {
    const context: RwTomlConverterContext = {
        sources: [
            {
                path: ['a', 'abc'],
                content: {
                    "core": {
                        "name": "az",
                        "list": ["one", "two", "three"]
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
        targets: [],
        into(this: RwTomlConverterContext): RwTomlBuilderContext {
            return {
                sources: this.sources.map((x) => {
                    return {
                        path: x.path,
                        content: x.content,
                        from: none(),
                        to: none()
                    };
                }),
                targets: []
            };
        }
    };
    it('builds single toml', () => {
        const result = build({context});
        expect(result.isOk()).to.equal(true);
    });
    it('it applies single converter on single toml', () => {
        const result = build({context});
        expect(result.isOk()).to.equal(true);
        const targets = result.unwrap();
        expect(targets[0].content['core']['list']).to.equal('one,two,three');
        expect(targets[0].path.join('/')).to.equal('a/abc');
    });
});

describe('/data/toml fromString', () => {

});