import CreateCollectionBtn from "@/app/(main)/_components/collection/CreateCollectionBtn";
import { prisma } from "@/shared/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import AlertBanner from "../AlertBanner";
import InitCollections from "@/shared/initData/InitCollections";
import { CollectionsMapper } from "./CollectionsMapper";
import { Fragment } from "react";
import EmptyCollectionState from "./EmptyCollectionState";

export async function CollectionsList() {

    const user = await currentUser();
    const collections = await prisma.collection.findMany({
        include: {
            tasks: true,
        },
        where: {
            userId: user?.id,
        },
    });
    console.log(collections)

    return (
        <Fragment>
            <InitCollections data={collections ? collections : []} />
            <EmptyCollectionState />
            <CreateCollectionBtn />
            <CollectionsMapper />
        </Fragment>
    )
}
