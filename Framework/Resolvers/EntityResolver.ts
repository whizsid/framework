import { Constructor } from '../../Support';
import { Entity } from '../../Database/Entity';
import { Request } from '../../Http';
import { BaseResolver, Container, InjectableMetadata, Scope } from '../../Container';
import { EntityConstructor } from '../../Database';

export class EntityResolver extends BaseResolver {

    constructor(container: Container) {
        super(container);
        this.setEntityScopeToRequest();
    }

    async resolve<T>(abstract: EntityConstructor<Entity> & typeof Entity, parametersValues: object[]): Promise<T> {
        let entity: Entity;
        const request = this.container.get(Request);
        const requestParameterName = abstract.name.toLowerCase();
        const parameter = request.parameters[requestParameterName];
        if (parameter) {
            entity = await abstract.find(Number(parameter));
        }

        // @ts-ignore
        return entity;
    }

    canResolve<T>(abstract: Constructor<T>): boolean {
        return abstract.prototype instanceof Entity;
    }

    private setEntityScopeToRequest() {
        const metadata: InjectableMetadata = Reflect.getMetadata(InjectableMetadata.KEY, Entity) || InjectableMetadata.DEFAULT();
        metadata.scope = Scope.REQUEST;
        Reflect.defineMetadata(InjectableMetadata.KEY, metadata, Entity);
    }
}