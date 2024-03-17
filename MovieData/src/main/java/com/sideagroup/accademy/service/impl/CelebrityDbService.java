package com.sideagroup.accademy.service.impl;

import com.sideagroup.accademy.dto.CelebrityDto;
import com.sideagroup.accademy.dto.GetAllCelebritiesResponseDto;
import com.sideagroup.accademy.dto.MovieDto;
import com.sideagroup.accademy.exception.GenericServiceException;
import com.sideagroup.accademy.mapper.CelebrityMapper;
import com.sideagroup.accademy.mapper.MovieCelebrityMapper;
import com.sideagroup.accademy.model.Celebrity;
import com.sideagroup.accademy.repository.CelebrityRepository;
import com.sideagroup.accademy.service.CelebrityService;
import com.sideagroup.accademy.service.validator.CelebrityValidator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CelebrityDbService implements CelebrityService {

    private static final Logger logger = LoggerFactory.getLogger(CelebrityDbService.class);

    @Autowired
    private CelebrityRepository repo;

    @Autowired
    private CelebrityMapper mapper;

    @Autowired
    private MovieCelebrityMapper movieCelebrityMapper;
    @Autowired
    private CelebrityValidator celebrityValidator;

    @Override
    public GetAllCelebritiesResponseDto getAll(int page, int size, String orderBy, String name) {
        logger.info("getAll called");
        celebrityValidator.validateQueryParam(orderBy);
        Pageable pageable = PageRequest.of(page, size, Sort.by(orderBy));
        Page<Celebrity> celebrities = name == null ? repo.findAll(pageable) :
                repo.findByPrimaryNameIgnoreCaseContaining(name, pageable);
        return mapper.toDto(celebrities, size);
    }

    @Override
    public Optional<CelebrityDto> getById(String id) {
        logger.info("getById called");
        Optional<Celebrity> result = repo.findById(id);
        if (!result.isEmpty()) {
            CelebrityDto dto = mapper.toDto(result.get(), true);
            return Optional.of(dto);
        }

        return Optional.empty();
    }

    @Override
    public CelebrityDto create(CelebrityDto celebrity) {
        logger.info("create called");
        Optional<Celebrity> opt = repo.findById(celebrity.getId());
        if (!opt.isEmpty())
            throw new GenericServiceException("Celebrity with id " + celebrity.getId() + " already exists");
        Celebrity entity = repo.save(mapper.toEntity(celebrity));
        return mapper.toDto(entity, false);
    }

    @Override
    public Optional<CelebrityDto> update(String id, CelebrityDto celebrity) {
        logger.info("update called");
        Optional<Celebrity> opt = repo.findById(id);
        if (opt.isEmpty())
            return Optional.empty();

        Celebrity entity = opt.get();
        mapper.updateFromDto(entity, celebrity);
        entity = repo.save(entity);

        return Optional.of(mapper.toDto(entity, false));
    }

    @Override
    public boolean deleteById(String id) {
        logger.info("deleteById called");
        repo.deleteById(id);
        return true;
    }
}
