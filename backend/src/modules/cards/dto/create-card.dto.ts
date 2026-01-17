export class CreateCardDto {
	card_number: string;
	expiry_date?: string;
	cvv_hash?: string;
	// raw cvv (stored as plain text in cvv_hash column for this project)
	cvv?: string;
	status?: string;
	name_on_card?: string;
	card_type?: string;
}
