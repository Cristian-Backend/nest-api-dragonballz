import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


@Schema()
export class Dragonballz extends Document{

    @Prop({
        unique: true,
        index: true,
    })

    name: string;

    @Prop({
        unique: true,
        index: true,
    })

     np : number

    @Prop({
        unique: true,
    })

     images: string;
}

export const DragonballzSchema = SchemaFactory.createForClass(Dragonballz);