import CommonHeader from "@/components/common-header/CommonHeader.component";
import ProfileHeader from "@/components/profile/profile-header/ProfileHeader.component";
import TermsContent from "@/components/termsContent/termsContent";
import { getCMSContent } from "@/components/termsContent/termsContent.http";
import { CMSPagesKeys } from "@/constants/enums";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import Loading from "../loading";

const page = async () => {
  const cmsRes = await getCMSContent();
  let content;
  if (cmsRes && cmsRes.statusCode === 200) {
    content = cmsRes.data.find(
      (allData: any) => allData.key === CMSPagesKeys.FAQ
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
        <ProfileHeader heading="FAQs" />
      </CommonHeader>
      <Suspense fallback={<Loading />}>
        <TermsContent content={content} accordian={true} />
      </Suspense>
    </>
  );
};

export default page;
