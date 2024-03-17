package com.sideagroup.accademy.service.validator;

import com.sideagroup.accademy.exception.GenericServiceException;
import org.springframework.stereotype.Component;

@Component
public class CelebrityValidator {
    public void validateQueryParam (String orderBy) {
        if (!"id".equals(orderBy) &&
                !"primaryName".equals(orderBy) &&
                !"birthYear".equals(orderBy)) {
            throw new GenericServiceException("Invalid Sort field '" + orderBy + "'. Valid values are: [id, primaryName, birthYear]");
        }
    }
}
