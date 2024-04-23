export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
	public: {
		Tables: {
			adjusted_cohort_graduation_rate: {
				Row: {
					academic_year: string | null;
					adult_ed_hs_diploma: number | null;
					aggregate_level: string | null;
					charter_school: string | null;
					chspe_completer: number | null;
					cohort_students: number | null;
					county_code: string;
					county_name: string | null;
					dass: string | null;
					district_code: string;
					district_name: string | null;
					dropout: number | null;
					ged_completer: number | null;
					golden_state_seal_merit_diploma: number | null;
					met_uc_csu_grad_reqs: number | null;
					other_transfer: number | null;
					regular_hs_diploma_graduates: number | null;
					reporting_category: string;
					school_code: string;
					school_name: string | null;
					seal_of_biliteracy: number | null;
					sped_certificate: number | null;
					still_enrolled: number | null;
				};
				Insert: {
					academic_year?: string | null;
					adult_ed_hs_diploma?: number | null;
					aggregate_level?: string | null;
					charter_school?: string | null;
					chspe_completer?: number | null;
					cohort_students?: number | null;
					county_code: string;
					county_name?: string | null;
					dass?: string | null;
					district_code: string;
					district_name?: string | null;
					dropout?: number | null;
					ged_completer?: number | null;
					golden_state_seal_merit_diploma?: number | null;
					met_uc_csu_grad_reqs?: number | null;
					other_transfer?: number | null;
					regular_hs_diploma_graduates?: number | null;
					reporting_category: string;
					school_code: string;
					school_name?: string | null;
					seal_of_biliteracy?: number | null;
					sped_certificate?: number | null;
					still_enrolled?: number | null;
				};
				Update: {
					academic_year?: string | null;
					adult_ed_hs_diploma?: number | null;
					aggregate_level?: string | null;
					charter_school?: string | null;
					chspe_completer?: number | null;
					cohort_students?: number | null;
					county_code?: string;
					county_name?: string | null;
					dass?: string | null;
					district_code?: string;
					district_name?: string | null;
					dropout?: number | null;
					ged_completer?: number | null;
					golden_state_seal_merit_diploma?: number | null;
					met_uc_csu_grad_reqs?: number | null;
					other_transfer?: number | null;
					regular_hs_diploma_graduates?: number | null;
					reporting_category?: string;
					school_code?: string;
					school_name?: string | null;
					seal_of_biliteracy?: number | null;
					sped_certificate?: number | null;
					still_enrolled?: number | null;
				};
				Relationships: [];
			};
			calpads_unduplicated_pupil_counts: {
				Row: {
					academic_year: string | null;
					calpads_fall_1_certification_status: string | null;
					calpads_unduplicated_pupil_count: number | null;
					charter_funding_type: string | null;
					charter_number: string | null;
					charter_school: string | null;
					county_code: string;
					county_name: string | null;
					direct_certification: number | null;
					district_code: string;
					district_name: string | null;
					district_type: string | null;
					educational_option_type: string | null;
					english_learner: number | null;
					foster: number | null;
					free_reduced_meal_program: number | null;
					high_grade: string | null;
					homeless: number | null;
					irc: string | null;
					low_grade: string | null;
					migrant_program: number | null;
					nslp_provision_status: string | null;
					school_code: string;
					school_name: string | null;
					school_type: string | null;
					total_enrollment: number | null;
					tribal_foster_youth: number | null;
					unduplicated_frpm_eligible_count: number | null;
				};
				Insert: {
					academic_year?: string | null;
					calpads_fall_1_certification_status?: string | null;
					calpads_unduplicated_pupil_count?: number | null;
					charter_funding_type?: string | null;
					charter_number?: string | null;
					charter_school?: string | null;
					county_code: string;
					county_name?: string | null;
					direct_certification?: number | null;
					district_code: string;
					district_name?: string | null;
					district_type?: string | null;
					educational_option_type?: string | null;
					english_learner?: number | null;
					foster?: number | null;
					free_reduced_meal_program?: number | null;
					high_grade?: string | null;
					homeless?: number | null;
					irc?: string | null;
					low_grade?: string | null;
					migrant_program?: number | null;
					nslp_provision_status?: string | null;
					school_code: string;
					school_name?: string | null;
					school_type?: string | null;
					total_enrollment?: number | null;
					tribal_foster_youth?: number | null;
					unduplicated_frpm_eligible_count?: number | null;
				};
				Update: {
					academic_year?: string | null;
					calpads_fall_1_certification_status?: string | null;
					calpads_unduplicated_pupil_count?: number | null;
					charter_funding_type?: string | null;
					charter_number?: string | null;
					charter_school?: string | null;
					county_code?: string;
					county_name?: string | null;
					direct_certification?: number | null;
					district_code?: string;
					district_name?: string | null;
					district_type?: string | null;
					educational_option_type?: string | null;
					english_learner?: number | null;
					foster?: number | null;
					free_reduced_meal_program?: number | null;
					high_grade?: string | null;
					homeless?: number | null;
					irc?: string | null;
					low_grade?: string | null;
					migrant_program?: number | null;
					nslp_provision_status?: string | null;
					school_code?: string;
					school_name?: string | null;
					school_type?: string | null;
					total_enrollment?: number | null;
					tribal_foster_youth?: number | null;
					unduplicated_frpm_eligible_count?: number | null;
				};
				Relationships: [];
			};
			ela_academic_indicators: {
				Row: {
					accountabilitymet: string | null;
					box: number | null;
					cds: string | null;
					change: number | null;
					changelevel: number | null;
					charter_flag: string | null;
					coe_flag: string | null;
					color: number | null;
					countyname: string | null;
					currdenom: number | null;
					currdenom_withoutPRLOSS: number | null;
					currnsizemet: string | null;
					currnumPRLOSS: number | null;
					currprate: number | null;
					currprate_enrolled: number | null;
					currprate_tested: number | null;
					currstatus: number | null;
					currstatus_withoutPRLOSS: number | null;
					dass_flag: string | null;
					districtname: string | null;
					hscutpoints: string | null;
					indicator: string | null;
					pairshare_method: string | null;
					priordenom: number | null;
					priordenom_withoutPRLOSS: number | null;
					priornsizemet: string | null;
					priornumPRLOSS: number | null;
					priorprate: number | null;
					priorprate_enrolled: number | null;
					priorprate_tested: number | null;
					priorstatus: number | null;
					priorstatus_withoutPRLOSS: number | null;
					reportingyear: string | null;
					rtype: string | null;
					schoolname: string | null;
					statuslevel: number | null;
					studentgroup: string | null;
				};
				Insert: {
					accountabilitymet?: string | null;
					box?: number | null;
					cds?: string | null;
					change?: number | null;
					changelevel?: number | null;
					charter_flag?: string | null;
					coe_flag?: string | null;
					color?: number | null;
					countyname?: string | null;
					currdenom?: number | null;
					currdenom_withoutPRLOSS?: number | null;
					currnsizemet?: string | null;
					currnumPRLOSS?: number | null;
					currprate?: number | null;
					currprate_enrolled?: number | null;
					currprate_tested?: number | null;
					currstatus?: number | null;
					currstatus_withoutPRLOSS?: number | null;
					dass_flag?: string | null;
					districtname?: string | null;
					hscutpoints?: string | null;
					indicator?: string | null;
					pairshare_method?: string | null;
					priordenom?: number | null;
					priordenom_withoutPRLOSS?: number | null;
					priornsizemet?: string | null;
					priornumPRLOSS?: number | null;
					priorprate?: number | null;
					priorprate_enrolled?: number | null;
					priorprate_tested?: number | null;
					priorstatus?: number | null;
					priorstatus_withoutPRLOSS?: number | null;
					reportingyear?: string | null;
					rtype?: string | null;
					schoolname?: string | null;
					statuslevel?: number | null;
					studentgroup?: string | null;
				};
				Update: {
					accountabilitymet?: string | null;
					box?: number | null;
					cds?: string | null;
					change?: number | null;
					changelevel?: number | null;
					charter_flag?: string | null;
					coe_flag?: string | null;
					color?: number | null;
					countyname?: string | null;
					currdenom?: number | null;
					currdenom_withoutPRLOSS?: number | null;
					currnsizemet?: string | null;
					currnumPRLOSS?: number | null;
					currprate?: number | null;
					currprate_enrolled?: number | null;
					currprate_tested?: number | null;
					currstatus?: number | null;
					currstatus_withoutPRLOSS?: number | null;
					dass_flag?: string | null;
					districtname?: string | null;
					hscutpoints?: string | null;
					indicator?: string | null;
					pairshare_method?: string | null;
					priordenom?: number | null;
					priordenom_withoutPRLOSS?: number | null;
					priornsizemet?: string | null;
					priornumPRLOSS?: number | null;
					priorprate?: number | null;
					priorprate_enrolled?: number | null;
					priorprate_tested?: number | null;
					priorstatus?: number | null;
					priorstatus_withoutPRLOSS?: number | null;
					reportingyear?: string | null;
					rtype?: string | null;
					schoolname?: string | null;
					statuslevel?: number | null;
					studentgroup?: string | null;
				};
				Relationships: [];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
	PublicTableNameOrOptions extends
		| keyof (PublicSchema['Tables'] & PublicSchema['Views'])
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
				Database[PublicTableNameOrOptions['schema']]['Views'])
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
			Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
			Row: infer R;
		}
		? R
		: never
	: PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
		? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
				Row: infer R;
			}
			? R
			: never
		: never;

export type TablesInsert<
	PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Insert: infer I;
		}
		? I
		: never
	: PublicTableNameOrOptions extends keyof PublicSchema['Tables']
		? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
				Insert: infer I;
			}
			? I
			: never
		: never;

export type TablesUpdate<
	PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Update: infer U;
		}
		? U
		: never
	: PublicTableNameOrOptions extends keyof PublicSchema['Tables']
		? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
				Update: infer U;
			}
			? U
			: never
		: never;

export type Enums<
	PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
	EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
		: never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
	? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
	: PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
		? PublicSchema['Enums'][PublicEnumNameOrOptions]
		: never;
