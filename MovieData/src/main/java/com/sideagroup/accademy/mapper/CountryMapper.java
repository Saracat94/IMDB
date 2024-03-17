package com.sideagroup.accademy.mapper;

import com.sideagroup.accademy.dto.CountryDto;
import com.sideagroup.accademy.model.Country;
import org.springframework.stereotype.Component;

@Component
public class CountryMapper {
    CountryDto toDto(Country entity) {
        CountryDto dto = new CountryDto();
        dto.setLanguage(entity.getLanguage());
        dto.setTitle(entity.getTitle());
        dto.setRegion(entity.getRegion());
        return dto;
    }
}
