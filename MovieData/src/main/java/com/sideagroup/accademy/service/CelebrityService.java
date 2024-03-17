package com.sideagroup.accademy.service;

import com.sideagroup.accademy.dto.CelebrityDto;
import com.sideagroup.accademy.dto.GetAllCelebritiesResponseDto;

import java.util.Optional;

public interface CelebrityService {

    public GetAllCelebritiesResponseDto getAll(int page, int size, String orderBy, String name);

    public Optional<CelebrityDto> getById(String id);

    public CelebrityDto create(CelebrityDto celebrity);

    public Optional<CelebrityDto> update(String id, CelebrityDto celebrity);

    public boolean deleteById(String id);
}
