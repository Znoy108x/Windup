import CollectionCard from "@/components/CollectionCard";
import CreateCollectionBtn from "@/components/CreateCollectionBtn";
import SadFace from "@/components/icons/SadFace";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import {Info} from "lucide-react"

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
                <Alert>
                    <Info />
                    <AlertTitle>There are no collections yet!</AlertTitle>
                    <AlertDescription>
                        Create a collection to get started
                    </AlertDescription>
                </Alert>
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
