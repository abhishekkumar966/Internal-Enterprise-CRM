export interface MessageTemplate {
  id: number;
  template_name: string;
  delivery_channel: string;
  message_configuration: {
    subject: string;
    body: string;
  };
}

export interface MessageTemplateRequest {
  template_name: string;
  delivery_channel: string;
  message_configuration: {
    subject: string;
    body: string;
  };
}