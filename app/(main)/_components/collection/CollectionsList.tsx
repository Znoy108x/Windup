import CreateCollectionBtn from "@/app/(main)/_components/collection/CreateCollectionBtn";
import { prisma } from "@/shared/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import AlertBanner from "../AlertBanner";
import InitCollections from "@/shared/initData/InitCollections";
import { CollectionsMapper } from "./CollectionsMapper";

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

    if (collections.length === 0) {
        return (
            <div className="flex flex-col gap-5">
                <AlertBanner title="EMPTY" description="Please create collections to move further!" />
                <CreateCollectionBtn />
            </div>
        );
    }

    return (
        <>
            <InitCollections data={collections} />
            <CreateCollectionBtn />
            <CollectionsMapper />
        </>
    );
}
