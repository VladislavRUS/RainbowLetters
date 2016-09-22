var box2d = {
    b2Vec2: Box2D.Common.Math.b2Vec2,
    b2BodyDef: Box2D.Dynamics.b2BodyDef,
    b2Body: Box2D.Dynamics.b2Body,
    b2FixtureDef: Box2D.Dynamics.b2FixtureDef,
    b2World: Box2D.Dynamics.b2World,
    b2Fixture: Box2D.Dynamics.b2Fixture,
    b2MassData: Box2D.Collision.Shapes.b2MassData,
    b2PolygonShape: Box2D.Collision.Shapes.b2PolygonShape,
    b2CircleShape: Box2D.Collision.Shapes.b2CircleShape,
    b2DebugDraw: Box2D.Dynamics.b2DebugDraw
};

var Body = function (details) {
    this.details = details = details || {};
    this.definition = new box2d.b2BodyDef();
    for (var k in this.definitionDefaults) {
        this.definition[k] = details[k] || this.definitionDefaults[k];
    }
    this.definition.position = new box2d.b2Vec2(details.x || 0, details.y || 0);
    this.definition.linearVelocity = new box2d.b2Vec2(details.vx || 0, details.vy || 0);
    this.definition.userData = this;
    this.definition.type = details.type == "static" ? box2d.b2Body.b2_staticBody : box2d.b2Body.b2_dynamicBody;
    this.body = GAME_WORLD.CreateBody(this.definition);
    this.fixtureDef = new box2d.b2FixtureDef();
    this.fixtureDef.filter.maskBits = 0x0000;
    for (var l in this.fixtureDefaults) {
        this.fixtureDef[l] = details[l] || this.fixtureDefaults[l];
    }

    details.shape = details.shape || this.defaults.shape;
    switch (details.shape) {
    case "circle":
        details.radius = details.radius || this.defaults.radius;
        this.fixtureDef.shape = new box2d.b2CircleShape(details.radius);
        break;
    case "block":
    default:
        details.width = details.width || this.defaults.width;
        details.height = details.height || this.defaults.height;

        this.fixtureDef.shape = new box2d.b2PolygonShape();
        this.fixtureDef.shape.SetAsBox(details.width / 2,
            details.height / 2);
        break;
    }
    this.body.CreateFixture(this.fixtureDef);
    return this.body;
};

Body.prototype.defaults = {
    shape: "block",
    width: 2,
    height: 2
};

Body.prototype.fixtureDefaults = {
    density: 10,
    friction: 1,
    restitution: 0.2
};

Body.prototype.definitionDefaults = {
    active: true,
    allowSleep: true,
    angle: 0,
    angularVelocity: 0,
    awake: true,
    bullet: false,
    fixedRotation: false
};

var GAME_WORLD = new box2d.b2World(new box2d.b2Vec2(0, 20), true);