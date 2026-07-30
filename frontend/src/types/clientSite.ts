export interface ClientSite {
    id: number;
    domain_name: string;
    api_key: string;
    status: string;
    daily_request_quota: number;
}

export interface ClientSiteRequest {
    domain_name: string;
    api_key: string;
    status: string;
    daily_request_quota: number;
}