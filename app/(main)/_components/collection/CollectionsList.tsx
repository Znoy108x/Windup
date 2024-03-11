import CollectionCard from "@/app/(main)/_components/collection/CollectionCard";
import CreateCollectionBtn from "@/app/(main)/_components/collection/CreateCollectionBtn";
import SadFace from "@/shared/components/icons/SadFace";
import { prisma } from "@/shared/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import AlertBanner from "../AlertBanner";

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
            <CreateCollectionBtn />
            <div className="flex flex-col gap-4 mt-6">
                {collections.map((collection) => (
                    <CollectionCard key={collection.id} collection={collection} />
                ))}
            </div>
        </>
    );
}
