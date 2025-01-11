import CommonHeader from "@/components/common-header/CommonHeader.component";
import ProfileHeader from "@/components/profile/profile-header/ProfileHeader.component";
import TermsContent from "@/components/termsContent/termsContent";
import { getCMSContent } from "@/components/termsContent/termsContent.http";
import React, { Suspense } from "react";
import Loading from "../loading";
import { notFound } from "next/navigation";
import { CMSPagesKeys } from "@/constants/enums";

const page = async () => {
  const cmsRes = await getCMSContent();
  let content;
  if (cmsRes && cmsRes.statusCode === 200) {
    content = cmsRes.data.find(
      (allData: any) => allData.key === CMSPagesKeys.PRIVACY_AND_POLICY
    );
  } else {
    return notFound();
  }
  if (!content) {
    return notFound();
  }
  return (
    <>
      <CommonHeader>
        <ProfileHeader heading="Privacy Policies" />
      </CommonHeader>
      <Suspense fallback={<Loading />}>
        <TermsContent content={content} />
      </Suspense>
    </>
  );
};

export default page;
