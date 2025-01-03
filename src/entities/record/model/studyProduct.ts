export type StudyProductDTO = {
    study_type:string,
    imp_or_nimp: string,
    src_modified_by: string,
    protocol_approved_date:string,
    src_modified_by_date: string,
    external_id: string,
    product_abbreviation:string,
    source_system:string,
    protocol_title:string,
    protocol_number:string,
    other_study_id:string,
    product_name:string,
    product_generic_name:string,
    study_product_type:string,
    masking:string,
    is_approved:string,
    product_family_code: string,
    doc_id:string,
    study_product_role: string,
    ui_modified_date:string,
    src_created_by:string,
    product_family_name:string,
    organization:string,
    study_number:string,
    src_created_by_date:string,
    external_product_identifier:string,
    study_phase:string,
    product_blinding:string,
    status:string,
    product_counter:string,
    ui_modified_by:null | string
}

export type Product = {
    IMPorNIMP: StudyProductDTO['imp_or_nimp'],
    externalProductIdentifier:StudyProductDTO['external_product_identifier'],
    fromBackend: 'Yes' | 'No',
    productNameHasCommas: 'Yes' | 'No',
    productAbbreviation: StudyProductDTO['product_abbreviation'],
    productBlinding: StudyProductDTO['product_blinding'],
    productGenericName:StudyProductDTO['product_generic_name'],
    productFamilyCode: StudyProductDTO['product_family_code'],
    productFamilyName: StudyProductDTO['product_family_name'],
    productName: StudyProductDTO['product_name'],
    productNameCustom?: string,
    status: StudyProductDTO['status'],
    studyProductType: StudyProductDTO['study_product_type'],
    studyProductRole: StudyProductDTO['study_product_role'],
    productCounter: StudyProductDTO['product_counter'],
    productWasUpdated:string
}

export type Study ={
    docId:string,
    protocolNumber:string,
    studyNumber:string,
    protocolTitle:string,
    studyProductType:string,
    studyType:string,
    studyPhase:string,
    maskingStudyBlinding:string,
    productBlinding:string,
    otherStudyId:string,

}

export type StudyProductSave = {

}

export type Embedded = {
    studyProduct: StudyProductDTO[]
}

export type Link = {
    href:string
}

export type Links = {
    self:Link;
    next:Link;
    selfFilter: Link;
    nextFilter: Link;
}

export type StudyProductResponse ={
    offset:number;
    limit:number;
    totalCount:number;
    _embedded : Embedded;
    _links:Links;
}
