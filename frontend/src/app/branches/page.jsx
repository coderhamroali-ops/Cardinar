import {getJson} from "@/lib/api";
import {Breadcrumbs} from "@/components/ui";
import BranchesTable from "@/app/branches/BranchesTable";

export default async function BranchesPage() {
    const branches = await getJson("/public/branches", []);

    return (
        <div className="mx-auto max-w-[1200px] px-4 pb-24">
            <Breadcrumbs items={[{label: "Где купить?"}]}/>
            <BranchesTable title="Наши официальные магазины" branches={branches.filter((b) => b.branchType === "official")}/>
            <BranchesTable title="Наши партнёры" branches={branches.filter((b) => b.branchType === "partner")}/>
        </div>
    );
}
